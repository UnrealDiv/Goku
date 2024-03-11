import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const aspect = {
    width:window.innerWidth,
    height:window.innerHeight
}
//Scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,aspect.width/aspect.height,0.01,2000);

const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({canvas,alpha:true});
renderer.setSize(aspect.width,aspect.height);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFShadowMap;


const controls = new OrbitControls(camera,canvas);
//Resize
window.addEventListener("resize",()=>{
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    camera.aspect = aspect.width/aspect.height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(aspect.width,aspect.height);
});
const mouse = {
    x:0,
    y:0
};
window.addEventListener("mousemove",(e)=>{
    mouse.x = ((e.clientX/window.innerWidth)-0.5)*2.0;
    mouse.y = (-(e.clientY/window.innerHeight)+0.5)*2.0;
});


camera.position.set(6,3,-40);

export {scene,renderer,camera,aspect,mouse,controls};