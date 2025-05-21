import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/RGBELoader.js';
import {createWorld} from '/historicalResearchBookbindingMuseum/world.js'
import {controlClassComp, controlClassMob} from '/historicalResearchBookbindingMuseum/controls.js'
import {checkRay} from '/historicalResearchBookbindingMuseum/objectCollisions.js'
import {labels} from '/historicalResearchBookbindingMuseum/labels.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xD6E6EE);
// scene.fog = new THREE. Fog( 0xffffff, 0.015, 10 )
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.rotation.order = "YXZ"

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
// renderer.shadowMap.enabled = true
renderer.domElement.style["user-select"] = "none"
document.body.appendChild( renderer.domElement );
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
}

const pmremGenerator = new THREE.PMREMGenerator( renderer );
const hdriLoader = new THREE.TextureLoader()
hdriLoader.load( '/historicalResearchBookbindingMuseum/resources/indoor_hdri.jpg', function ( texture ) {
  const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
  texture.dispose(); 
  scene.environment = envMap
  scene.background = envMap
} );
// renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = 1.3;
// renderer.outputEncoding = THREE.sRGBEncoding;

createWorld(scene)

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3)
scene.add(ambientLight)
// const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.3)
// const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3)
// directionalLight.castShadow = true
// directionalLight1.position.set(1, 0.25, 1)
// directionalLight2.position.set(-1,0.25,-1)
// scene.add(directionalLight1)
// scene.add(directionalLight2)
// const pointLight = new THREE.PointLight('#ffffff', 1)
// pointLight.position.set(0, 9.9, 14.5)
// scene.add(pointLight)

// CONTROLS
let cClass;
const startMenu = document.getElementById("startMenu")
if (window.orientation == 0) {
    // alert("vertical")
    startMenu.addEventListener('click', function () {
        startMenu.style.display = "none"
    })
    cClass = new controlClassMob(camera, renderer)
} else if (window.orientation == 90 || window.orientation == -90) {
    // alert("horizontal")
    startMenu.addEventListener('click', function () {
        startMenu.style.display = "none"
    })
    cClass = new controlClassMob(camera, renderer)
} else {
    // alert("computer")
    startMenu.addEventListener('click', function () {
        cClass.makeControls().lock()
    })
    cClass = new controlClassComp(camera, renderer)
}

document.getElementById("closeBtn1").onclick = function (e) {
    e.target.parentNode.style.display = "none"
    cClass.makeControls().lock()
}
document.getElementById("closeBtn2").onclick = function (e) {
    e.target.parentNode.style.display = "none"
    cClass.makeControls().lock()
}

let mouseRaycaster = new THREE.Raycaster()
    let mouse = new THREE.Vector2()
    mouse.x = 0
    mouse.y = 0

document.onclick = function(e) {
    mouseRaycaster.setFromCamera(mouse, camera)
    var intersects = mouseRaycaster.intersectObject(scene, true)
    if (intersects.length > 0 && e.target.id != "startMenu" && e.target.id != "closeBtn1" && e.target.id != "closeBtn2") {
        if (intersects[0].object.name.indexOf("ARTIFACT") == 0) {
            let code = intersects[0].object.name.substring(9)
            document.getElementById("artifactDisplay").children[1].src = "/historicalResearchBookbindingMuseum/2DArt/" + code + ".png"
            document.getElementById("artifactDisplay").style.display = "block"
            cClass.makeControls().unlock()
        } else if (intersects[0].object.name.indexOf("LABEL") == 0) {
            let code = intersects[0].object.name.substring(6)
            let labelDisplay = document.getElementById("labelDisplay")
            labelDisplay.children[1].innerHTML = labels[code][0]
            labelDisplay.children[2].innerHTML = labels[code][1]
            labelDisplay.children[3].innerHTML = labels[code][2]
            labelDisplay.children[4].innerHTML = labels[code][3]
            labelDisplay.children[5].innerHTML = labels[code][4]
            labelDisplay.style.display = "block"
            cClass.makeControls().unlock()
        }
    }
}

function updateLocationDisplay(cameraX, cameraZ) {
    if (cameraX > -15 && cameraX < 15 && cameraZ > -15 && cameraZ < 15) {
        document.getElementById("locationDisplay").innerHTML = "From Scroll to Codex"
    } else if (cameraX > 15 && cameraX < 30 && cameraZ > -15 && cameraZ < 15) {
        document.getElementById("locationDisplay").innerHTML = "Sewing the Spine"
    } else if (cameraX > 0 && cameraX < 30 && cameraZ > 15 && cameraZ < 45) {
        document.getElementById("locationDisplay").innerHTML = "Middle Ages and Decorative Bookbinding"
    } else if (cameraX > 30 && cameraX < 60 && cameraZ > 15 && cameraZ < 45) {
        document.getElementById("locationDisplay").innerHTML = "Incunabula Period and Printed Books"
    } else if (cameraX > 30 && cameraX < 60 && cameraZ > 0 && cameraZ < 15) {
        document.getElementById("locationDisplay").innerHTML = "Industrial Revolution and the Arts and Crafts Movement"
    } else if (cameraX > 30 && cameraX < 60 && cameraZ > -15 && cameraZ < 0) {
        document.getElementById("locationDisplay").innerHTML = "Modern Revival in Bookbinding"
    } else if (cameraX > 0 && cameraX < 75 && cameraZ > 45 && cameraZ < 60) {
        document.getElementById("locationDisplay").innerHTML = "The Hall of Decorative Techniques"
    } else if (cameraX > 60 && cameraX < 75 && cameraZ > -15 && cameraZ <= 45) {
        document.getElementById("locationDisplay").innerHTML = "The Hall of Decorative Techniques"
    }
}


camera.position.z = 5;

const playerHeight = 0.1


function animate() {
	
	cClass.move(camera)
	
	checkRay(scene, camera)

	render()
	
	updateLocationDisplay(camera.position.x, camera.position.z)

}

function render() {
    
    renderer.render(scene, camera)
}
