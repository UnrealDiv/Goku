import * as THREE from 'three';
import {scene,renderer,camera,controls,} from './settings';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';



const keyDown = {
    w:0,
    a:0,
    s:0,
    d:0,
    space:0
};
const gltfLoader = new GLTFLoader();
let mixer=null;
let model;
let forwardAction;
let backwardAction;
let moveForward = false;
let moveBackward = false;
let jump=false;
let jumpAction;
gltfLoader.load("./models/goku3.glb",(glb)=>{
    mixer = new THREE.AnimationMixer(glb.scene);
    model = glb.scene;
    scene.add(model);
    model.scale.set(1,1,1);
    model.position.z = -40;
    glb.scene.children[0].children.forEach(x=>{
        x.castShadow=true;
    })
    let stand = mixer.clipAction(glb.animations[0]);
    stand.play();
    jumpAction = mixer.clipAction(glb.animations[13]);
    forwardAction = mixer.clipAction(glb.animations[5]);
    backwardAction = mixer.clipAction(glb.animations[6]);
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keypress",onKeyPress);


});


gltfLoader.load("./models/snake.glb",(glb)=>{
    scene.add(glb.scene);
    glb.scene.scale.set(0.5,0.5,1.5);
    glb.scene.children[0].castShadow=true;
    glb.scene.children[0].receiveShadow=true;
    glb.scene.position.set(0,-0.75,20);
});
gltfLoader.load("./models/div1.glb",(glb)=>{
    scene.add(glb.scene);
    glb.scene.scale.set(0.5,0.5,0.5);
    glb.scene.position.set(0,1,0);
});


function onKeyPress(event){
    if (event.key === ' ') {
        
        jump = true;
        jumpAction.loop = THREE.LoopOnce;
        jumpAction.reset();
        jumpAction.play();
        // jump=false;  
    }
}

function onKeyDown(event) {
 
    if(event.key !=' '){
        if (event.key === 'w') {
            moveForward = true;
            forwardAction.play();
            
        }  else if (event.key === 's') {
            moveBackward = true;
            backwardAction.play();
        }
    }
}
function onKeyUp(event) {
    if (event.key === 'w') {
        moveForward = false;
        forwardAction.stop();
    } else if (event.key === 's') {
        moveBackward = false;
        backwardAction.stop();
    }
}
const cameraControls = {
    camX:0,
    camY:0,
    camZ:15
}
scene.add(camera);
const moveForwardButton = document.getElementById('moveForwardButton');
const moveBackwardButton = document.getElementById('moveBackwardButton');

moveForwardButton.addEventListener('touchstart', () => {
    moveForward = true;
    forwardAction.play();
});

moveForwardButton.addEventListener('touchend', () => {
    moveForward = false;
    forwardAction.stop();
});

moveBackwardButton.addEventListener('touchstart', () => {
    moveBackward = true;
    backwardAction.play();
});

moveBackwardButton.addEventListener('touchend', () => {
    moveBackward = false;
    backwardAction.stop();
});



const directionalLight2 = new THREE.DirectionalLight(0xffffff,3.0);
;
scene.add(directionalLight2);

directionalLight2.position.set(20,0.5,-20);

const directionalLight = new THREE.DirectionalLight(0x00ffff,1.0);
;
scene.add(directionalLight,directionalLight.target);
directionalLight.castShadow = true;
directionalLight.position.set(0,3.1,4);
directionalLight.shadow.camera.left = -1;
directionalLight.shadow.camera.right = 1;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;



let movementSpeed = {
    speed:0.04
}
controls.enabled=false;

//Clock
let previousTime = 0;
const Clock = new THREE.Clock();
//Animate

let modelPos = new THREE.Vector3(0,0,0);
function animate(){
    const elapsedTime = Clock.getElapsedTime();
    const frameTime = elapsedTime-previousTime;
    previousTime = elapsedTime;
    if(mixer){
        mixer.update(frameTime);
    }
    if (moveForward) {
        const forwardDirection = new THREE.Vector3(0, 0, 1).applyQuaternion(model.quaternion).normalize();
        model.position.add(forwardDirection.multiplyScalar(movementSpeed.speed));
        camera.position.z +=movementSpeed.speed;
    }else if (moveBackward) {
        const backwardDirection = new THREE.Vector3(0, 0, -1).applyQuaternion(model.quaternion);
        model.position.add(backwardDirection.multiplyScalar(movementSpeed.speed));
        camera.position.z -=movementSpeed.speed;
    }
    
    if(model){
        let mov = model.position.z;
        camera.lookAt(new THREE.Vector3(0,3,mov));
    }
    
    // controls.update();
    renderer.render(scene,camera);
    window.requestAnimationFrame(animate);
}
animate();