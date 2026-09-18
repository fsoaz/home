"use client";

import { useEffect, useRef, useState } from "react";

const vertexShader = `attribute vec2 aPosition;void main(){gl_Position=vec4(aPosition,0.,1.);}`;

const fragmentShader = `
precision highp float;
uniform vec2 uResolution,uMouse;uniform float uTime,uScroll,uQuality;
#define MAX_STEPS 92
const float HORIZON=.43,DISK_INNER=.70,DISK_OUTER=3.45;
float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),mix(hash21(i+vec2(0,1)),hash21(i+1.),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise2(p);p=p*2.03+7.1;a*=.5;}return v;}
vec3 stars(vec3 d){vec2 s=vec2(atan(d.z,d.x),asin(clamp(d.y,-1.,1.)));vec2 c=floor(s*vec2(105.,72.));float seed=hash21(c);float star=step(.9915,seed)*pow(hash21(c+4.7),15.);vec3 temp=mix(vec3(.62,.72,1.),vec3(1.,.81,.48),hash21(c+9.2));return temp*star*.62;}
vec4 disk(vec2 p,float time){
 float radius=length(p);if(radius<DISK_INNER||radius>DISK_OUTER)return vec4(0.);
 float angle=atan(p.y,p.x);float kepler=1.45/pow(max(radius,.35),1.5);float phase=angle-time*kepler;float radial=(radius-DISK_INNER)/(DISK_OUTER-DISK_INNER);
 float turbulence=fbm(vec2(radius*2.8-time*.035,phase*2.));float filaments=.54+.46*sin(phase*5.+radius*8.+turbulence*4.);float fine=.66+.34*sin(phase*17.-radius*24.);float density=mix(turbulence,filaments*fine,.58);
 density*=smoothstep(DISK_INNER,DISK_INNER+.18,radius)*smoothstep(DISK_OUTER,DISK_OUTER-.85,radius);
 float toward=sin(angle);float doppler=clamp(1.+.72*toward/sqrt(max(radius,.7)),.32,1.75);float heat=1.-smoothstep(0.,.82,radial);
 vec3 color=mix(vec3(.72,.32,.045),vec3(1.,.91,.65),heat);color=mix(color,vec3(.72,.82,1.),max(toward,0.)*heat*.19);
 float alpha=density*(.13+heat*.42)*doppler;return vec4(color*alpha*doppler,clamp(alpha,0.,.82));
}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*uResolution)/min(uResolution.x,uResolution.y);
 float tilt=.31+uScroll*.48+uMouse.y*.055;float distance=4.55-uScroll*.42;vec3 origin=vec3(uMouse.x*.22,tilt,-distance);vec3 target=vec3(0.,uScroll*.03,0.);
 vec3 forward=normalize(target-origin),right=normalize(cross(forward,vec3(0,1,0))),up=cross(right,forward);vec3 velocity=normalize(forward+uv.x*right*1.32+uv.y*up*1.32);vec3 position=origin;
 vec3 color=vec3(0.);float transmission=1.,closest=20.,crossings=0.;bool captured=false;
 for(int i=0;i<MAX_STEPS;i++){
  if(float(i)>mix(55.,91.,uQuality))break;float radius=length(position);closest=min(closest,radius);if(radius<HORIZON){captured=true;break;}if(radius>9.2)break;
  float stepLength=clamp(.022+radius*.041,.025,.28);float gravity=.068/max(radius*radius,.075);velocity=normalize(velocity-normalize(position)*gravity*stepLength*4.15);vec3 nextPosition=position+velocity*stepLength;
  if(position.y*nextPosition.y<0.&&crossings<4.){float ct=position.y/(position.y-nextPosition.y);vec3 hit=mix(position,nextPosition,ct);vec4 light=disk(hit.xz,uTime);color+=light.rgb*transmission;transmission*=1.-light.a;crossings+=1.;}
  position=nextPosition;if(transmission<.035)break;
 }
 if(!captured)color+=stars(velocity)*transmission;
 float photonRing=exp(-pow((closest-.645)/.040,2.));color+=vec3(1.,.72,.26)*photonRing*transmission*.48;if(captured)color*=.15;
 color=1.-exp(-color*1.65);color=pow(color,vec3(.88));color*=smoothstep(1.05,.26,length(uv));float alpha=clamp(max(max(color.r,color.g),color.b)*1.35,0.,1.);gl_FragColor=vec4(color,alpha);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Black hole shader compilation failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function BlackHole() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = canvas.current;
    const container = host.current;
    if (!node || !container || matchMedia("(prefers-reduced-motion: reduce)").matches || (navigator.hardwareConcurrency ?? 4) <= 2) return;
    const gl = node.getContext("webgl", { alpha: true, antialias: false, depth: false, powerPreference: "high-performance", preserveDrawingBuffer: false });
    if (!gl) return;
    const vertex = compile(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);gl.attachShader(program, fragment);gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { console.warn("Black hole shader link failed:", gl.getProgramInfoLog(program)); return; }
    gl.useProgram(program);
    const buffer = gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER, buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program,"aPosition");gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    const resolution=gl.getUniformLocation(program,"uResolution"),time=gl.getUniformLocation(program,"uTime"),mouse=gl.getUniformLocation(program,"uMouse"),scroll=gl.getUniformLocation(program,"uScroll"),qualityUniform=gl.getUniformLocation(program,"uQuality");
    let targetX=0,targetY=0,smoothX=0,smoothY=0,targetScroll=0,smoothScroll=0,frame=0,lastFrame=0,sampleStart=performance.now(),sampleFrames=0;
    let visible=true,quality=innerWidth<700?.48:1,pixelRatio=Math.min(devicePixelRatio,innerWidth<700?.72:1.15);
    const resize=()=>{const box=container.getBoundingClientRect();node.width=Math.max(1,Math.floor(box.width*pixelRatio));node.height=Math.max(1,Math.floor(box.height*pixelRatio));gl.viewport(0,0,node.width,node.height);};
    const pointer=(event:PointerEvent)=>{targetX=event.clientX/innerWidth*2-1;targetY=1-event.clientY/innerHeight*2;};
    const updateScroll=()=>{targetScroll=Math.min(1,Math.max(0,scrollY/Math.max(innerHeight*.9,1)));};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!frame)frame=requestAnimationFrame(draw);},{threshold:.01});
    const draw=(now:number)=>{frame=0;if(!visible||document.hidden)return;const interval=innerWidth<700?33:22;if(now-lastFrame>=interval){smoothX+=(targetX-smoothX)*.045;smoothY+=(targetY-smoothY)*.045;smoothScroll+=(targetScroll-smoothScroll)*.055;gl.uniform2f(resolution,node.width,node.height);gl.uniform2f(mouse,smoothX,smoothY);gl.uniform1f(time,now*.001);gl.uniform1f(scroll,smoothScroll);gl.uniform1f(qualityUniform,quality);gl.drawArrays(gl.TRIANGLES,0,6);lastFrame=now;sampleFrames++;if(sampleFrames===45){const fps=sampleFrames*1000/(now-sampleStart);if(fps<30&&pixelRatio>.62){pixelRatio*=.78;quality=Math.max(.42,quality-.22);resize();}sampleFrames=0;sampleStart=now;}}frame=requestAnimationFrame(draw);};
    resize();updateScroll();setReady(true);observer.observe(container);addEventListener("resize",resize);addEventListener("pointermove",pointer,{passive:true});addEventListener("scroll",updateScroll,{passive:true});frame=requestAnimationFrame(draw);
    return()=>{observer.disconnect();removeEventListener("resize",resize);removeEventListener("pointermove",pointer);removeEventListener("scroll",updateScroll);cancelAnimationFrame(frame);gl.deleteShader(vertex);gl.deleteShader(fragment);gl.deleteProgram(program);gl.deleteBuffer(buffer);};
  }, []);

  return <div ref={host} className={`black-hole ${ready ? "is-ready" : ""}`} aria-hidden="true"><div className="black-hole-fallback"/><canvas ref={canvas}/><div className="orbit-label">FM <span>/</span> EVENT HORIZON</div></div>;
}
