import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js'

export function checkRay(scene, camera) {
    var c = camera.position
var rc1 = new THREE.Raycaster(c, new THREE.Vector3(1, 0, 0)).intersectObjects(scene.children)
    var rc2 = new THREE.Raycaster(c, new THREE.Vector3(0, 0, 1)).intersectObjects(scene.children)
    var rc3 = new THREE.Raycaster(c, new THREE.Vector3(-1, 0, 0)).intersectObjects(scene.children)
    var rc4 = new THREE.Raycaster(c, new THREE.Vector3(0, 0, -1)).intersectObjects(scene.children) 
    var r1 = rc1.length > 0 ? rc1[0] : null;
    var r2 = rc2.length > 0 ? rc2[0] : null;
    var r3 = rc3.length > 0 ? rc3[0] : null;
    var r4 = rc4.length > 0 ? rc4[0] : null;
    var arr = [];
    if (r1) arr.push(r1);
    if (r2) arr.push(r2);
    if (r3) arr.push(r3);
    if (r4) arr.push(r4);
	var rSorted = arr.sort((a, b) => { return a.distance - b.distance })
    if (rSorted.length > 0 && rSorted[0].distance < 0.1) {
        var r = rSorted[0]
        var d = new THREE.Vector3()
        d.subVectors(c, r.point).normalize();
        // console.log(r,d)
        camera.position.addScaledVector(d, 0.1)
    }  
}