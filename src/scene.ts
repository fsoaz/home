import * as THREE from 'three';

// Keep the photograph's composition while moving only its plasma and lensed light.
const fragmentShader = `
precision highp float;
uniform sampler2D backdrop;
uniform vec2 viewport;
uniform vec2 imageSize;
uniform vec2 imageOffset;
uniform vec2 sourceSize;
uniform vec2 pointer;
uniform float time;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 cell = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(cell), hash(cell + vec2(1.0, 0.0)), f.x),
             mix(hash(cell + vec2(0.0, 1.0)), hash(cell + 1.0), f.x), f.y);
}
void main() {
  vec2 screen = vec2(vUv.x, 1.0 - vUv.y) * viewport;
  vec2 photo = (screen - imageOffset) / imageSize;
  if (photo.x < 0.0 || photo.x > 1.0 || photo.y < 0.0 || photo.y > 1.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec2 pixel = photo * sourceSize;
  vec2 center = sourceSize * vec2(0.770, 0.345);
  vec2 p = pixel - center;
  float radius = length(p);
  float angle = atan(p.y, p.x);
  float horizon = sourceSize.x * 0.096;
  float rim = exp(-pow((radius - horizon) / 24.0, 2.0));
  float halo = exp(-pow((radius - horizon - 16.0) / 66.0, 2.0));
  float outside = smoothstep(horizon - 22.0, horizon + 4.0, radius);

  // The disk follows the diagonal in the source image, so resizing cannot detach it.
  vec2 disk = mat2(0.952, 0.306, -0.306, 0.952) * p;
  float stream = exp(-pow(disk.y / 38.0, 2.0));
  stream *= exp(-pow(disk.x / 610.0, 2.0)) * outside;
  float flow = noise(vec2(disk.x * 0.022 - time * 0.72, disk.y * 0.10));
  float orbit = sin(angle * 11.0 - time * 1.25 + noise(p * 0.014) * 3.0);

  // A small, continuous displacement makes the photographed filaments flow.
  vec2 tangent = vec2(-p.y, p.x) / max(radius, 1.0);
  vec2 displacement = tangent * rim * (orbit * 3.2 + sin(time * 0.43) * 1.8);
  displacement += vec2(0.952, -0.306) * stream * (flow - 0.5) * 10.0;
  displacement += normalize(p + vec2(0.001)) * halo * sin(angle * 7.0 - time * 0.7) * 0.9;
  displacement += pointer * 3.5;
  vec2 sampleUV = photo + displacement / sourceSize;
  vec4 color = texture2D(backdrop, vec2(sampleUV.x, 1.0 - sampleUV.y));

  float luminance = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
  float hot = smoothstep(0.10, 0.8, luminance);
  float filament = pow(0.5 + 0.5 * sin(angle * 17.0 - time * 1.6 + flow * 4.0), 5.0);
  color.rgb *= 1.0 + stream * (flow - 0.44) * 0.28 + rim * orbit * 0.07;
  color.rgb += vec3(1.0, 0.48, 0.18) * hot * (rim * filament * 0.09 + stream * flow * 0.035);

  // Sparse stars breathe gently; leave the event horizon itself completely dark.
  vec2 starCell = floor(pixel / 3.0);
  float twinkle = sin(time * (0.5 + hash(starCell)) + hash(starCell + 5.0) * 6.283);
  float sky = (1.0 - smoothstep(0.025, 0.22, luminance)) * (1.0 - halo) * outside;
  color.rgb *= 1.0 + sky * twinkle * 0.14;
  gl_FragColor = vec4(color.rgb, 1.0);
  #include <colorspace_fragment>
}`;

export function startScene(host: HTMLElement, toggle: HTMLButtonElement): () => void {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch {
    return () => {};
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.className = 'space-animation';
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  let disposed = false;
  let ready = false;
  let visible = true;
  let contextLost = false;
  let paused = false;
  let frame = 0;
  let previousTime = 0;
  let lastRender = 0;
  const targetPointer = new THREE.Vector2();
  const uniforms = {
    backdrop: { value: null as THREE.Texture | null },
    viewport: { value: new THREE.Vector2(1, 1) },
    imageSize: { value: new THREE.Vector2(1, 1) },
    imageOffset: { value: new THREE.Vector2() },
    sourceSize: { value: new THREE.Vector2(1672, 941) },
    pointer: { value: new THREE.Vector2() },
    time: { value: 0 },
  };
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position, 1.0); }',
    fragmentShader,
  });
  const geometry = new THREE.PlaneGeometry(2, 2);
  scene.add(new THREE.Mesh(geometry, material));

  const resize = () => {
    if (disposed) return;
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    // Bound both DPR and total pixels, including tall mobile project layouts.
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.35, Math.sqrt(2_000_000 / (width * height))));
    renderer.setSize(width, height, false);
    uniforms.viewport.value.set(width, height);
    const style = getComputedStyle(host);
    const source = uniforms.sourceSize.value;
    const size = style.backgroundSize.split(' ');
    let imageWidth: number;
    let imageHeight: number;
    if (size[0] === 'cover') {
      const scale = Math.max(width / source.x, height / source.y);
      imageWidth = source.x * scale;
      imageHeight = source.y * scale;
    } else {
      // The mobile design uses auto width and a fixed 810px image height.
      imageHeight = parseFloat(size[1]) || height;
      imageWidth = imageHeight * source.x / source.y;
    }
    const offset = (value: string, available: number) => value.endsWith('%')
      ? available * parseFloat(value) / 100 : parseFloat(value) || 0;
    uniforms.imageSize.value.set(imageWidth, imageHeight);
    uniforms.imageOffset.value.set(
      offset(style.backgroundPositionX, width - imageWidth),
      offset(style.backgroundPositionY, height - imageHeight),
    );
  };

  const active = () => ready && visible && !document.hidden && !motion.matches && !paused && !contextLost && !disposed;
  const tick = (now: number) => {
    frame = 0;
    if (!active()) { sync(); return; }
    frame = requestAnimationFrame(tick);
    if (now - lastRender < 1000 / 30) return;
    const elapsed = previousTime ? Math.min((now - previousTime) / 1000, 0.1) : 0;
    previousTime = now;
    lastRender = now;
    uniforms.time.value += elapsed;
    uniforms.pointer.value.lerp(targetPointer, 1 - Math.exp(-elapsed * 3));
    renderer.render(scene, camera);
    host.classList.add('animation-ready');
  };
  const sync = () => {
    if (disposed) return;
    canvas.hidden = motion.matches || contextLost;
    toggle.hidden = !ready || motion.matches || contextLost;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = (paused ? toggle.dataset.playLabel : toggle.dataset.pauseLabel) || '';
    if (motion.matches || contextLost) host.classList.remove('animation-ready');
    if (active() && !frame) {
      previousTime = 0;
      lastRender = 0;
      frame = requestAnimationFrame(tick);
    } else if (!active() && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    }
  };

  const texture = new THREE.TextureLoader().load(`${import.meta.env.BASE_URL}event-horizon.webp`, loaded => {
    if (disposed) { loaded.dispose(); return; }
    uniforms.sourceSize.value.set(loaded.image.width, loaded.image.height);
    ready = true;
    resize();
    sync();
  }, undefined, () => { ready = false; sync(); });
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  uniforms.backdrop.value = texture;

  const lost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    sync();
  };
  const restored = () => { contextLost = false; sync(); };
  const pointer = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || !active()) return;
    const bounds = host.getBoundingClientRect();
    targetPointer.set((event.clientX - bounds.left) / bounds.width - 0.5, (event.clientY - bounds.top) / bounds.height - 0.5);
  };
  const resetPointer = () => targetPointer.set(0, 0);
  const togglePaused = () => { paused = !paused; sync(); };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  const intersection = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    sync();
  });
  intersection.observe(host);
  const opening = host.parentElement!;
  opening.addEventListener('pointermove', pointer);
  opening.addEventListener('pointerleave', resetPointer);
  toggle.addEventListener('click', togglePaused);
  canvas.addEventListener('webglcontextlost', lost);
  canvas.addEventListener('webglcontextrestored', restored);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  resize();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    intersection.disconnect();
    opening.removeEventListener('pointermove', pointer);
    opening.removeEventListener('pointerleave', resetPointer);
    toggle.removeEventListener('click', togglePaused);
    canvas.removeEventListener('webglcontextlost', lost);
    canvas.removeEventListener('webglcontextrestored', restored);
    document.removeEventListener('visibilitychange', sync);
    motion.removeEventListener('change', sync);
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
    canvas.remove();
    host.classList.remove('animation-ready');
  };
}
