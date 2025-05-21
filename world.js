import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js'

export function createWorld(scene) {
    
    // LOADING MANAGER
    const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onLoad = function ( ) {
	console.log( 'Loading complete!');
	document.getElementById("loadingScr").style.display = "none"
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
	document.getElementById("loadingScr").children[1].innerHTML = Math.round((itemsLoaded/itemsTotal)*100) + "%";
};

manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};
    
    // TEXTURES
    
    const loader = new THREE.TextureLoader(manager);
    const texture1 = loader.load('/historicalResearchBookbindingMuseum/resources/white_marble.jpg');
    texture1.wrapS = THREE.RepeatWrapping;
    texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set(40,40)
    
    const texture2 = loader.load('/historicalResearchBookbindingMuseum/resources/ceiling_tiles.jpg');
    texture2.wrapS = THREE.RepeatWrapping;
    texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set(16,16)
    
    const paintTex = loader.load('/historicalResearchBookbindingMuseum/resources/wall_paint.jpg');
    paintTex.wrapS = THREE.RepeatWrapping;
    paintTex.wrapT = THREE.RepeatWrapping;
    paintTex.repeat.set(7,7)
    
    const stoneTex = loader.load('/historicalResearchBookbindingMuseum/resources/flat_stone.jpg');
    stoneTex.wrapS = THREE.RepeatWrapping;
    stoneTex.wrapT = THREE.RepeatWrapping;
    stoneTex.repeat.set(2,2)
    
    const canvasTex = loader.load('/historicalResearchBookbindingMuseum/resources/canvas.jpg');
    canvasTex.wrapS = THREE.RepeatWrapping;
    canvasTex.wrapT = THREE.RepeatWrapping;
    canvasTex.repeat.set(1,1)

    // ADD MODELS TO SCENE
    
    const floorGeo = new THREE.PlaneGeometry(200,200)
    const floorMat = new THREE.MeshPhysicalMaterial({color: 0x666666})
    floorMat.map = texture1
    floorMat.clearcoat = 1
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -5
    scene.add(floor)
    
    const ceilingGeo = new THREE.PlaneGeometry(200,200)
    const ceilingMat = new THREE.MeshStandardMaterial({color: 0x777777})
    ceilingMat.map = texture2
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat)
    ceiling.rotation.x = Math.PI / 2
    ceiling.position.y = 10
    scene.add(ceiling)
    
    // WALLS
    // rooms are 30 or 15 dimensions. Openings are 12 or 4.5
    const wallMat = new THREE.MeshStandardMaterial({color: 0x2f3d30})
    wallMat.roughness = 0.6
    wallMat.map = paintTex
    wallMat.side = THREE.DoubleSide
    wallMat.envMapIntensity = 2;
    
    const wall1Geo = new THREE.PlaneGeometry(90,20)
    const wall1 = new THREE.Mesh(wall1Geo, wallMat)
    wall1.position.z = -15
    wall1.position.x = 30
    scene.add(wall1)

    const wall2Geo = new THREE.PlaneGeometry(30,20)
    const wall2 = new THREE.Mesh(wall2Geo, wallMat)
    wall2.position.x = -15
    wall2.rotation.y = Math.PI/2
    scene.add(wall2)
    
    const wall3Geo = new THREE.PlaneGeometry(12,20)
    const wall3 = new THREE.Mesh(wall3Geo, wallMat)
    wall3.position.x = 15
    wall3.position.z = -9
    wall3.rotation.y = -Math.PI/2
    wall3.material.side = THREE.DoubleSide
    scene.add(wall3)
    
    const wall4Geo = new THREE.PlaneGeometry(12,20)
    const wall4 = new THREE.Mesh(wall3Geo, wallMat)
    wall4.position.x = 15
    wall4.position.z = 9
    wall4.rotation.y = -Math.PI/2
    wall4.material.side = THREE.DoubleSide
    scene.add(wall4)
    
    const wall5Geo = new THREE.PlaneGeometry(34.5,20)
    const wall5 = new THREE.Mesh(wall5Geo, wallMat)
    wall5.position.z = 15
    wall5.position.x = 2.25
    scene.add(wall5)
    
    const wall6Geo = new THREE.PlaneGeometry(6,10)
    const wall6a = new THREE.Mesh(wall6Geo, wallMat)
    wall6a.position.x = 15
    wall6a.position.y = 7.5
    wall6a.rotation.y = -Math.PI/2
    scene.add(wall6a)
    const wall6b = new THREE.Mesh(wall6Geo, wallMat)
    wall6b.position.x = 22.5
    wall6b.position.z = 15
    wall6b.position.y = 7.5
    scene.add(wall6b)
    const wall6c = new THREE.Mesh(wall6Geo, wallMat)
    wall6c.position.x = 15
    wall6c.position.z = 45
    wall6c.position.y = 7.5
    scene.add(wall6c)
    const wall6d = new THREE.Mesh(wall6Geo, wallMat)
    wall6d.position.x = 45
    wall6d.position.z = 15
    wall6d.position.y = 7.5
    scene.add(wall6d)
    const wall6e = new THREE.Mesh(wall6Geo, wallMat)
    wall6e.position.x = 45
    wall6e.position.z = 45
    wall6e.position.y = 7.5
    scene.add(wall6e)
    const wall6f = new THREE.Mesh(wall6Geo, wallMat)
    wall6f.position.x = 45
    wall6f.position.y = 7.5
    scene.add(wall6f)
    const wall6g = new THREE.Mesh(wall6Geo, wallMat)
    wall6g.position.x = 60
    wall6g.position.z = -7.5
    wall6g.position.y = 7.5
    wall6g.rotation.y = -Math.PI/2
    scene.add(wall6g)
    
    const wall7Geo = new THREE.PlaneGeometry(7,11)
    const wall7 = new THREE.Mesh(wall7Geo, wallMat)
    wall7.material.side = THREE.DoubleSide
    wall7.position.z = -2
    scene.add(wall7)
    
    const wall8Geo = new THREE.PlaneGeometry(3,11)
    const wall8a = new THREE.Mesh(wall8Geo, wallMat)
    wall8a.material.side = THREE.DoubleSide
    wall8a.position.z = -1
    wall8a.position.x = -4.5
    wall8a.rotation.y = Math.PI/4
    scene.add(wall8a)
    const wall8b = new THREE.Mesh(wall8Geo, wallMat)
    wall8b.material.side = THREE.DoubleSide
    wall8b.position.z = -1
    wall8b.position.x = 4.5
    wall8b.rotation.y = -Math.PI/4
    scene.add(wall8b)
    
    const wall9Geo = new THREE.PlaneGeometry(8,20)
    const wall9a = new THREE.Mesh(wall9Geo, wallMat)
    wall9a.position.z = -12.2
    wall9a.position.x = -12.2
    wall9a.rotation.y = Math.PI/4
    const wall9b = new THREE.Mesh(wall9Geo, wallMat)
    wall9b.position.z = -12.2
    wall9b.position.x = 12.2
    wall9b.rotation.y = -Math.PI/4
    const wall9c = new THREE.Mesh(wall9Geo, wallMat)
    wall9c.position.z = 12.2
    wall9c.position.x = 12.2
    wall9c.rotation.y = Math.PI/4
    const wall9d = new THREE.Mesh(wall9Geo, wallMat)
    wall9d.position.z = 12.2
    wall9d.position.x = -12.2
    wall9d.rotation.y = -Math.PI/4
    const wall9e = new THREE.Mesh(wall9Geo, wallMat)
    wall9e.position.z = 17.8
    wall9e.position.x = 2.8
    wall9e.rotation.y = Math.PI/4
    const wall9f = new THREE.Mesh(wall9Geo, wallMat)
    wall9f.position.z = 42.2
    wall9f.position.x = 2.8
    wall9f.rotation.y = -Math.PI/4
    scene.add(wall9a)
    scene.add(wall9b)
    scene.add(wall9c)
    scene.add(wall9d)
    scene.add(wall9e)
    scene.add(wall9f)
    
    const wall10Geo = new THREE.PlaneGeometry(16.5,20)
    const wall10 = new THREE.Mesh(wall10Geo, wallMat)
    wall10.position.x = 33.75
    wall10.position.z = 15
    scene.add(wall10)
    
    const wall11Geo = new THREE.PlaneGeometry(12,20) 
    const wall11 = new THREE.Mesh(wall11Geo, wallMat) 
    wall11.position.x = 54
    wall11.position.z = 15
    scene.add(wall11)
    
    const wall12 = new THREE.Mesh(wall11Geo, wallMat)
    wall12.position.x = 54
    scene.add(wall12)
    
    const wall13 = new THREE.Mesh(wall11Geo, wallMat)
    wall13.position.x = 36
    scene.add(wall13)
    
    const wall14 = new THREE.Mesh(wall11Geo, wallMat) 
    wall14.position.x = 6
    wall14.position.z = 45
    scene.add(wall14)
    
    const wall15Geo = new THREE.PlaneGeometry(24,20) 
    const wall15 = new THREE.Mesh(wall15Geo, wallMat)
    wall15.position.x = 30
    wall15.position.z = 45
    scene.add(wall15)
    
    const wall16 = new THREE.Mesh(wall11Geo, wallMat) 
    wall16.position.x = 54
    wall16.position.z = 45
    scene.add(wall16)
    
    const wall17Geo = new THREE.PlaneGeometry(75,20)
    const wall17 = new THREE.Mesh(wall17Geo, wallMat)
    wall17.position.x = 37.5
    wall17.position.z = 60
    scene.add(wall17)
    
    const wall18Geo = new THREE.PlaneGeometry(45,20)
    const wall18 = new THREE.Mesh(wall18Geo, wallMat)
    wall18.rotation.y = Math.PI/2
    wall18.position.z = 37.5
    scene.add(wall18)
    
    const wall19Geo = new THREE.PlaneGeometry(60,20)
    const wall19 = new THREE.Mesh(wall19Geo, wallMat)
    wall19.rotation.y = Math.PI/2
    wall19.position.z = 15
    wall19.position.x = 30
    scene.add(wall19)
    
    const wall20Geo = new THREE.PlaneGeometry(49.5,20)
    const wall20 = new THREE.Mesh(wall20Geo, wallMat)
    wall20.rotation.y = Math.PI/2
    wall20.position.z = 20.25
    wall20.position.x = 60
    scene.add(wall20)
    
    const wall21Geo = new THREE.PlaneGeometry(4.5,20)
    const wall21 = new THREE.Mesh(wall21Geo, wallMat)
    wall21.rotation.y = Math.PI/2
    wall21.position.z = -12.75
    wall21.position.x = 60
    scene.add(wall21)
    
    const wall22 = new THREE.Mesh(wall17Geo, wallMat)
    wall22.rotation.y = Math.PI/2
    wall22.position.z = 22.5
    wall22.position.x = 75
    scene.add(wall22)
    
    const wall23Geo = new THREE.PlaneGeometry(15, 20)
    const wall23 = new THREE.Mesh(wall23Geo, wallMat)
    wall23.position.x = 22.5
    wall23.position.z = 30
    scene.add(wall23)
    
    const wall24Geo = new THREE.PlaneGeometry(10, 20)
    const wall24 = new THREE.Mesh(wall24Geo, wallMat)
    wall24.position.x = 45
    wall24.position.z = 30
    scene.add(wall24)
    
    // MODELS
    
    const logoGeo = new THREE.PlaneGeometry(5,5)
    const logoTex = loader.load('/historicalResearchBookbindingMuseum/resources/bookbinding_def.png', () => {},() => {console.log('loading progressing')},() =>{console.log('loading error')});
    const logoMat = new THREE.MeshStandardMaterial({color: 0x000000})
    logoMat.map = logoTex
    logoMat.transparent = true
    const logoDecal = new THREE.Mesh(logoGeo, logoMat)
    logoDecal.position.z = -1.9
    logoDecal.position.y = 0.3
    scene.add(logoDecal)
    
    const aIDs = ["KR101", "KR102", "KR103", "KR104", "KR105", "KR201", "KR202", "KR301", "KR302", "KR303", "KR304", "KR401", "KR402", "KR403", "KR404", "KR501", "KR502", "KR601", "KR602", "KR603", "KR604", "KR701", "KR702", "KR703", "KR704", "KR705", "KR706", "KR707", "KR708", "KR709", "KR710"]
    const aLoc = {
        "KR101": [5, 12.1, 0, -12.1, -Math.PI/4],
        "KR102": [6.5, 5.8, 1.4, -14.9, 0],
        "KR103": [12, -14.9, 1, 0, Math.PI/2],
        "KR104": [5, -12.1, 0, -12.1, Math.PI/4],
        "KR105": [3, -5.8, 1.4, -14.9, 0],
        "KR201": [2.5, 29.9, 1.4, -6, -Math.PI/2],
        "KR202": [3, 29.9, 1.4, 6, -Math.PI/2],
        "KR301": [4, 2.9, 1.4, 17.9, Math.PI/4, -2],
        "KR302": [4, 0.1, 1.4, 30, Math.PI/2, -2],
        "KR303": [6.5, 29.9, 1.4, 37.5, -Math.PI/2, -1.5],
        "KR304": [4, 2.9, 1.4, 42.1, 3*Math.PI/4, -2],
        "KR401": [5, 59.9, 1.4, 25, -Math.PI/2],
        "KR402": [4, 59.9, 1.4, 35, -Math.PI/2, -1.8],
        "KR403": [5, 30.1, 1.4, 25, Math.PI/2, -1.4],
        "KR404": [4.5,30.1,1.4,35, Math.PI/2, -2.2],
        "KR501": [3.8, 30.1, 1.4, 7.5, Math.PI/2, -1.8],
        "KR502": [4, 59.9, 1.4, 7.5, -Math.PI/2, -1.8],
        "KR601": [4, 30.1, 1.4, -7.5, Math.PI/2, -2.3],
        "KR602": [4, 36, 1.4, -0.1, Math.PI, -2.3],
        "KR603": [4, 54, 1.4, -0.1, Math.PI, -2.3],
        "KR604": [4, 54, 1.4, -14.9, 0, -2.3],
        "KR706": [4.5, 12.5, 1.4, 59.9, Math.PI, -2],
        "KR703": [5, 25, 1.2, 59.9, Math.PI],
        "KR704": [5, 37.5, 1.2, 59.9, Math.PI],
        "KR709": [5, 50, 1.4, 59.9, Math.PI],
        "KR702": [4.5, 62.5, 1.4, 59.9, Math.PI, -2],
        "KR701": [5, 74.9, 1.4, 47.5, -Math.PI/2, -1.6],
        "KR705": [4.5, 74.9, 1.4, 35, -Math.PI/2, -2],
        "KR708": [4, 74.9, 1.4, 22.5, -Math.PI/2, -2],
        "KR707": [5, 74.9, 1.3, 10, -Math.PI/2],
        "KR710": [5, 74.9, 0.5, -2.5, -Math.PI/2]
    }
    
    for (let i in aIDs) {
        let artID = aIDs[i]
        addArtifact(artID, aLoc[artID][0], aLoc[artID][1], aLoc[artID][2], aLoc[artID][3], aLoc[artID][4])
    }
    
    function addArtifact(id, size, xPos, yPos, zPos, yRot) {
        var a101Geo = new THREE.PlaneGeometry(size,size)
        const a101Tex = loader.load('/historicalResearchBookbindingMuseum/2DArt/' + id + '.png', () =>
        {a101Tex.needsUpdate = true;a101.scale.set(1.0,(a101Tex.image.height/a101Tex.image.width),1.0);}, () => {console.log('loading progressing')}, () => {console.log('loading error')});
        const a101Mat = new THREE.MeshPhysicalMaterial({color: 0x666666, clearcoat: 1, clearcoatRoughness: 0, roughness: 0})
        a101Mat.map = a101Tex
        a101Mat.transparent = true
        a101Mat.envMapIntensity = 2;
        const a101 = new THREE.Mesh(a101Geo, a101Mat)
        a101.rotation.y = yRot
        a101.position.z = zPos
        a101.position.y = yPos
        a101.position.x = xPos
        a101.name = "ARTIFACT " + id
        scene.add(a101)
    }
    
    for (let i in aIDs) {
        let artID = aIDs[i]
        const labelGeo = new THREE.PlaneGeometry(1, 0.5)
        const labelMat = new THREE.MeshPhysicalMaterial({color: 0xdddddd, metalness: 1, roughness: 0.1})
        const label = new THREE.Mesh(labelGeo, labelMat)
        label.name = "LABEL " + artID
        label.position.x = aLoc[artID][1]
        label.position.y = -1.3
        if (aLoc[artID].length == 6) {
            label.position.y = aLoc[artID][5]
        }
        label.position.z = aLoc[artID][3]
        label.rotation.y = aLoc[artID][4]
        scene.add(label)
    }
    
    // x, z, y rot
    const wallsList = ["KR000", "KR100", "KR200", "KR300", "KR400", "KR500A", "KR500B", "KR600"]
    const wallInfo = {
        "KR000": [4, 14.9, -Math.PI],
        "KR100": [-12.1, 12.1, -5*Math.PI/4],
        "KR200": [22.5, -14.9, 0],
        "KR300": [22.5, 29.9, -Math.PI],
        "KR400": [45, 30.1, 0],
        "KR500A": [36, 0.1, 0],
        "KR500B": [54, 0.1, 0],
        "KR600": [36, -14.9, 0]
    }
    
    for (let i in wallsList) {
        let wallID = wallsList[i]
        const wallInfoGeo = new THREE.PlaneGeometry(6, 11)
        const wallInfoTex = loader.load('/historicalResearchBookbindingMuseum/Walls/' + wallID + '.png')
        const wallInfoMat = new THREE.MeshPhysicalMaterial({color: 0x000000})
        wallInfoMat.map = wallInfoTex
        wallInfoMat.transparent = true
        const wallInfoMesh = new THREE.Mesh(wallInfoGeo, wallInfoMat)
        wallInfoMesh.position.x = wallInfo[wallID][0]
        wallInfoMesh.position.z = wallInfo[wallID][1]
        wallInfoMesh.position.y = 1
        wallInfoMesh.rotation.y = wallInfo[wallID][2]
        scene.add(wallInfoMesh)
    }
    
    const creditsGeo = new THREE.PlaneGeometry(6, 11)
    const creditsTex = loader.load("/historicalResearchBookbindingMuseum/resources/museumCredits.png")
    const creditsMat = new THREE.MeshPhysicalMaterial({color: 0x000000})
    creditsMat.map = creditsTex
    creditsMat.transparent = true
    const creditsMesh = new THREE.Mesh(creditsGeo, creditsMat)
    creditsMesh.position.set(-4, 1, 14.9)
    creditsMesh.rotation.y = -Math.PI
    scene.add(creditsMesh)
    
    const mapTex = loader.load("/historicalResearchBookbindingMuseum/resources/museumMap.png")
    const mapMat = new THREE.MeshPhysicalMaterial({color: 0x000000})
    mapMat.map = mapTex
    mapMat.transparent = true
    const mapMesh = new THREE.Mesh(creditsGeo, mapMat)
    mapMesh.position.set(12.1, 1, 12.1)
    mapMesh.rotation.y = 5*Math.PI/4
    scene.add(mapMesh)
    

    
}
