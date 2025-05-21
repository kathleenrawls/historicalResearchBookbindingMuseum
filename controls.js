// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js'
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/PointerLockControls.js';

class controlClassComp {
    constructor(camera, renderer) {
        this.controls = new PointerLockControls(camera, renderer.domElement)
        this.moveBackward = false
        this.moveForward = false
        this.moveLeft = false
        this.moveRight = false
        this.speed = 0.1
        this.controls.addEventListener( 'lock', function () {
	        startMenu.style.display = 'none';
        } );
        this.controls.addEventListener( 'unlock', function () {
	        startMenu.style.display = 'block';
        } );
        document.addEventListener("keydown", function (e) {
    switch(e.code) {
        case "KeyW":
            this.moveForward = true;
            break
        case "KeyA":
            this.moveLeft = true;
            break
        case "KeyS":
            this.moveBackward = true;
            break
        case "KeyD":
            this.moveRight = true;
            break
        default:
            break
    }
    }.bind(this))
    document.addEventListener("keyup", function (e) {
        switch(e.code) {
            case "KeyW":
                this.moveForward = false;
                break
            case "KeyA":
                this.moveLeft = false;
                break
            case "KeyS":
                this.moveBackward = false;
                break
            case "KeyD":
                this.moveRight = false;
                break
            default:
                break
        }
    }.bind(this))
    }
    
    makeControls() {
        return this.controls
    }
    
    move(camera) {
        // console.log(this.moveBackward, this.moveForward, this.moveLeft, this.moveRight)
        if (this.moveBackward) {
    	    this.controls.moveForward(-this.speed)
    	}
    	if (this.moveForward) {
    	    this.controls.moveForward(this.speed)
    	}
    	if (this.moveLeft) {
    	    this.controls.moveRight(-this.speed)
    	}
    	if (this.moveRight) {
    	    this.controls.moveRight(this.speed)
    	}
    }
}

class controlClassMob {
    constructor(camera, renderer) {
        this.xSpeed = 0
        this.ySpeed = 0
        this.xRotSpeed = 0
        this.yRotSpeed = 0
        this.maxSpeed = 0.09
        this.maxRotSpeed = 0.02
        this.threshold = 50
        this.startX = 0
        this.startY = 0
        this.startX1 = 0
        this.startY1 = 0
        window.ontouchstart = function (e) {
            e.preventDefault()
            if (e.changedTouches[0].clientX < window.innerWidth/2) {
                this.startX = e.changedTouches[0].clientX
                this.startY = e.changedTouches[0].clientY
            } else {
                this.startX1 = e.changedTouches[0].clientX
                this.startY1 = e.changedTouches[0].clientY
            }
        }.bind(this)
        window.ontouchmove = function (e) {
            e.preventDefault()
            if (e.changedTouches[0].clientX < window.innerWidth/2) {
                const endX = e.changedTouches[0].clientX
                const endY = e.changedTouches[0].clientY
                const distX = endX - this.startX
                const distY = endY - this.startY
                let hyp = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2))
                if (hyp > this.threshold) {
                    hyp = this.threshold
                }
                const scaledHyp = (hyp/this.threshold)*this.maxSpeed
                const angle = Math.atan2(distY, distX)
                this.xSpeed = Math.cos(angle)*scaledHyp
                this.ySpeed = Math.sin(angle)*scaledHyp
            } else {
                const endX = e.changedTouches[0].clientX
                const endY = e.changedTouches[0].clientY
                const distX = endX - this.startX1
                const distY = endY - this.startY1
                let hyp = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2))
                if (hyp > this.threshold) {
                    hyp = this.threshold
                }
                const scaledHyp = (hyp/this.threshold)*this.maxRotSpeed
                const angle = Math.atan2(distY, distX)
                this.yRotSpeed = Math.cos(angle)*scaledHyp
                this.xRotSpeed = Math.sin(angle)*scaledHyp
            }
            if (e.changedTouches[1] && e.changedTouches[1].clientX < window.innerWidth/2) {
                const endX = e.changedTouches[1].clientX
                const endY = e.changedTouches[1].clientY
                const distX = endX - this.startX
                const distY = endY - this.startY
                let hyp = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2))
                if (hyp > this.threshold) {
                    hyp = this.threshold
                }
                const scaledHyp = (hyp/this.threshold)*this.maxSpeed
                const angle = Math.atan2(distY, distX)
                this.xSpeed = Math.cos(angle)*scaledHyp
                this.ySpeed = Math.sin(angle)*scaledHyp
            } else if (e.changedTouches[1]) {
                const endX = e.changedTouches[1].clientX
                const endY = e.changedTouches[1].clientY
                const distX = endX - this.startX1
                const distY = endY - this.startY1
                let hyp = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2))
                if (hyp > this.threshold) {
                    hyp = this.threshold
                }
                const scaledHyp = (hyp/this.threshold)*this.maxRotSpeed
                const angle = Math.atan2(distY, distX)
                this.yRotSpeed = Math.cos(angle)*scaledHyp
                this.xRotSpeed = Math.sin(angle)*scaledHyp
            }
            document.body.style.zoom = 1
        }.bind(this)
        window.ontouchend = function () {
                this.xSpeed = 0
                this.ySpeed = 0
                this.xRotSpeed = 0
                this.yRotSpeed = 0
        }.bind(this)
    }
    
    move(camera) {
        camera.translateX(this.xSpeed)
        camera.translateZ(this.ySpeed)
        camera.position.y = 0
        camera.rotation.y -= this.yRotSpeed
        if (camera.rotation.x > -Math.PI/2 && camera.rotation.x < Math.PI/2 ) {
            camera.rotation.x -= this.xRotSpeed
        } else if (this.xRotSpeed < 0 && camera.rotation.x <= -Math.PI/2) {
            camera.rotation.x -= this.xRotSpeed
        } else if (this.xRotSpeed > 0 && camera.rotation.x >= Math.PI/2) {
            camera.rotation.x -= this.xRotSpeed
        } else {
            camera.rotation.x = camera.rotation.x
        }
    }
}

export {controlClassComp, controlClassMob}