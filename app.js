//DOM selection
const main = document.getElementById('3d-canvas');
const loaderScreen = document.querySelector('.loader');
const loaderNum = document.getElementById('num');

// global variables
let scene, camera, renderer, controls, loader, mtlLoader, hemiLight;
// additiona variables
let cube, axesHelper ;

// Initializing the program  
init();
//addCube();
animate();
window.onresize = onWindowResize; 

function init(){

    // camera and scenes
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    controls = new THREE.OrbitControls(camera, main);
    hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1.5);
    scene.add( hemiLight );

    // defining the render engine
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2;
    renderer.setSize(window.innerWidth, window.innerHeight);
    main.appendChild(renderer.domElement);

    // defining the obj and mtl loader
    loader = new THREE.OBJLoader();
    mtlLoader = new THREE.MTLLoader();

    // axis helpers for x,y,z axis
    axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    // all the cammera settings go here
    camera.position.z = 10;
    scene.background = null;
    controls.update();
}

// mtl loader
//mtlLoader.setBaseUrl( '../assets/');
//mtlLoader.setPath( '../assets/' );
let url = '../assets/gallardo-lp-570-4-superleggera-2011.mtl'

mtlLoader.load( url, function( materials ) {
    materials.preload();
    loader.setMaterials( materials );
    loader.load(
        // resource URL
        '../assets/gallardo-lp-570-4-superleggera-2011.obj',
        // called when resource is loaded
        function ( object ) {
            loaderScreen.remove();
            scene.add( object );
        },
        // called when loading is in progresses
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            let num = ( xhr.loaded / xhr.total * 100 ).toFixed(0);
            if(num < 95){
                loaderNum.textContent= num + ' % loaded' ;
            } else{
                loaderNum.textContent= 'Making some fine adjustment, this will take a few seconds' ;
            }
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    ) 
});


// load the 3d model


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

    camera.rotation.y += 0.1;

    //update the controller every frame
    controls.update();
    renderer.render(scene, camera);
};

