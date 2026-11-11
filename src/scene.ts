import * as THREE from 'three';
export function startScene(host: Element): () => void {
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 if(motion.matches)return ()=>{};
 let renderer:THREE.WebGLRenderer;
 try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:false});}catch{return ()=>{};}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));host.appendChild(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.Camera();
 const uniforms={time:{value:0},aspect:{value:1},pointer:{value:new THREE.Vector2()}};
 const material=new THREE.ShaderMaterial({uniforms,vertexShader:'void main(){gl_Position=vec4(position,1.0);}',fragmentShader:`precision highp float;
 uniform vec2 resolution; uniform float time; uniform float aspect; uniform vec2 pointer;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 void main(){vec2 p=gl_FragCoord.xy / resolution.xy - .5;p.x*=aspect;p-=pointer*.018;p.x-=.22;float r=length(p);float a=atan(p.y,p.x);float ellipse=length(vec2(p.x,p.y*3.9));float disk=exp(-abs(ellipse-.28)*65.);float orbit=exp(-abs(r-.155)*240.);float halo=exp(-abs(r-.17)*27.)*.22;float streak=.65+.35*sin(a*18.+time*.35+sin(a*7.)*2.);vec3 color=vec3(1.,.42,.13)*(disk*streak*1.5+orbit*1.4+halo);color+=vec3(1.,.82,.55)*pow(disk,3.)*.8;if(r<.147)color*=smoothstep(.14,.15,r);vec2 grid=floor(gl_FragCoord.xy/3.);float star=step(.9994,hash(grid))*hash(grid+8.);color+=vec3(star*.5)*smoothstep(.19,.4,r);gl_FragColor=vec4(color,1.);}`});
 Object.assign(uniforms,{resolution:{value:new THREE.Vector2()}});
 const mesh=new THREE.Mesh(new THREE.PlaneGeometry(2,2),material);scene.add(mesh);
 const resize=()=>{const box=host.getBoundingClientRect();renderer.setSize(box.width,box.height);uniforms.aspect.value=box.width/box.height;(material.uniforms.resolution.value as THREE.Vector2).set(renderer.domElement.width,renderer.domElement.height)};resize();
 const observer=new ResizeObserver(resize);observer.observe(host);let visible=true;const intersection=new IntersectionObserver(entries=>visible=entries[0].isIntersecting);intersection.observe(host);
 const pointer=(e:PointerEvent)=>uniforms.pointer.value.set(e.clientX/innerWidth-.5,e.clientY/innerHeight-.5);window.addEventListener('pointermove',pointer);
 let frame=0;const tick=(t:number)=>{frame=requestAnimationFrame(tick);if(visible&&!document.hidden&&!motion.matches){uniforms.time.value=t/1000;renderer.render(scene,camera)}};frame=requestAnimationFrame(tick);
 return ()=>{cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();window.removeEventListener('pointermove',pointer);mesh.geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};
}
