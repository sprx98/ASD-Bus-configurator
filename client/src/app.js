//Imports
import * as THREE from '/build/three.module.js';
import {GLTFLoader} from '/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';

//DOM selection
const main = document.getElementById('3d-canvas');
const loaderScreen = document.querySelector('.loader');
const loaderNum = document.getElementById('num'); 

// global variables
let scene, camera, renderer, controls, hemiLight, hemi ;
// additiona variables
let axesHelper ;

// Initializing the program  
init();
//addCube();
animate();
window.onresize = onWindowResize; 

function init(){

    // camera and scenes
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    controls = new OrbitControls(camera, main);
    hemiLight = new THREE.HemisphereLight(0xffe0bd, 0xffe0bd, 1.5);
    scene.add( hemiLight );

    // setting the controls 
    controls.autoRotate = 1.0;
    controls.minDistance = 1.5;
    controls.maxDistance = 3;
    controls.minZoom = 1.5;
    controls.maxZoom = 3;
    controls.minPolarAngle = 0.5; 
	controls.maxPolarAngle = 1.5; 
	controls.dampingFactor = 0.1;
    controls.zoomSpeed = 0.6;
    controls.panSpeed = 1.0;
    controls.enableKeys = false;
    controls.enablePan = false;
    controls.screenSpacePanning = false;
    controls.enableKeys = false;


    // light
    let light1 = new THREE.PointLight( 0xffe0bd, 5, 200 );
    light1.position.set( 50, 50, 50 );
    scene.add( light1 );
    let light2 = new THREE.PointLight( 0xffe0bd, 5, 300 );
    light2.position.set(-50, 50, 50);
    scene.add( light2 );
    let light3 = new THREE.PointLight( 0xffe0bd, 5, 200 );
    light3.position.set( 50, -50, 50 );
    scene.add( light3 );
    let light4 = new THREE.PointLight( 0xffe0bd, 5, 300 );
    light4.position.set(-50, -50, 50);
    scene.add( light4 );
    let spotLight = new THREE.SpotLight(0xffe0bd, 4);
    spotLight.castShadows = true;
    scene.add( spotLight );


    // defining the render engine
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.shadowMap.enable = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.LinearToneMapping;
    //renderer.toneMappingExposure = 2;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enable = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.gammaFactor = 2.2;
    main.appendChild(renderer.domElement);

    // axis helpers for x,y,z axis
    axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );
    scene.background = null;
    // all the cammera settings go here
    camera.position.z = 10;
   
    controls.update();
}


// load the 3d model
var loader2 = new GLTFLoader();

loader2.load('../assets/buske7.gltf', function (gltf) {
    loaderScreen.remove();
    scene.add(gltf.scene);
},
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        let num = (xhr.loaded / xhr.total * 100).toFixed(0);
        if (num < 60) {
            loaderNum.textContent = num + ' % loaded';
        } else {
            loaderNum.textContent = 'Making some fine adjustment, this will take a few seconds';
        }
    },

    undefined, function (error) {

        console.error(error);

});

// this function updates the canvas when the size changes
function onWindowResize() {
    //get the size of the window
    camera.aspect = main.clientWidth / main.clientHeight;
    // update the camera
    camera.updateProjectionMatrix();
    // change the size of the rendere
    renderer.setSize(main.clientWidth, main.clientHeight);
};

// function for animation executes every frame
function animate() {
    requestAnimationFrame(animate);
    //update the controller every frame
    controls.update();
    renderer.render(scene, camera);
};
