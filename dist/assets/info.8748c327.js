import"./modulepreload-polyfill.b7f2da20.js";/* empty css              */import{S as L,T as P,N as T,e as z,f as A,M as b,B as G,h as R,i as S,j as Y,k as j,A as k,l as E,c as W,W as B,d as C}from"./vendor.0c22aa3a.js";const q=document.querySelector("canvas.webgll"),a=new L,D=new P,u=D.load("static/5.jpg");u.magFilter=T;const H=new z({color:"#ffeded",gradientMap:u}),l=4,N=new A(10,3,64,8,18,3),i=new b(N,H);a.add(i);i.scale.set(.09,.09,.09);const X=[i],g=500,d=new Float32Array(g*3);for(let e=0;e<g;e++)d[e*3+0]=(Math.random()-.5)*10,d[e*3+1]=l*.5-Math.random()*l*3,d[e*3+2]=(Math.random()-.5)*10;const x=new G;x.setAttribute("position",new R(d,3));const K=new S({color:"#ffeded",sizeAttenuation:!0,size:.03}),I=new Y(x,K);a.add(I);const f=new j("#FFFFFF",.6);f.position.set(.5,.5,0);a.add(f);const J=new k("#020202",.7);a.add(J);const t={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{t.width=window.innerWidth,t.height=window.innerHeight,n.aspect=t.width/t.height,n.updateProjectionMatrix(),r.setSize(t.width,t.height),r.setPixelRatio(Math.min(window.devicePixelRatio,2))});const o=new E;a.add(o);const n=new W(35,t.width/t.height,.1,100);n.position.z=6;o.add(n);const r=new B({canvas:q,alpha:!0});r.setSize(t.width,t.height);r.setPixelRatio(Math.min(window.devicePixelRatio,2));const s={};s.y=0;s.x=0;window.addEventListener("mousemove",e=>{s.x=e.clientX/t.width-.5,s.y=e.clientY/t.height-.5});const O=new C;let p=0,M=window.scrollY;window.addEventListener("scroll",e=>{M=window.scrollY});const y=()=>{const e=O.getElapsedTime(),w=e-p;p=e;for(const c of X)c.rotation.x=e*.2,c.rotation.y=e*.1;n.position.y=-M/t.height*l;const v=s.x*.5,F=-s.y*.5;o.position.x+=(v-o.position.x)*3*w,o.position.y+=(F-o.position.y)*3*w;function h(c){c.matches?(i.position.x=0,i.scale.set(.055,.055,.055)):(i.position.x=2,i.scale.set(.09,.09,.09))}var m=window.matchMedia("(max-width: 1024px)");h(m),m.addListener(h),r.render(a,n),window.requestAnimationFrame(y)};y();
