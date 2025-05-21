// max storage = 8

// ITEM FORMAT
// ["name", "2D item image", "3D file name", "function to interact (eat / drink / open UI)", 0 / 1 for unselected or selected]

const actionFunctions = {}
actionFunctions["openBook"] = function (divId, ctrl) {
    if (typeof ctrl.isLocked === "boolean") {
        ctrl.unlock()
    }
    var screen = document.getElementById(divId)
    screen.style.display = "flex"
    screen.getElementsByTagName("button")[0].onclick = function () {
        if (typeof ctrl.isLocked === "boolean") {
            ctrl.lock()
        }
        screen.style.display = "none"
    }
}

const invPossibilities = [["test", "/2DArt/logo2.png", "NONE", "openBook"]]

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js'

class inventory {
    constructor(startInv, controls) {
        if (typeof controls.makeControls === "function") {
            this.controls = controls.makeControls()
        } else {
            this.controls = controls
        }
        this.contents = []
        this.selectedItem = 10
        this.mouseRaycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        if (startInv.length > 0) {
            for (var i = 0; i < startInv.length; i++) {
                this.contents.push(startInv[i])
            }
        }
        if (window.orientation != 90 && window.orientation != -90 && window.orientation != 0) {
            document.addEventListener("keypress", function (e) {
                // console.log(e.code)
                if (e.code == "KeyC") {
                    this.selectItem(0)
                    this.interact()
                }
            }.bind(this))
        } else {
            document.addEventListener("click", function (e) {
                if (e.target.parentNode.classList[0] == "invItem") {
                    this.selectItem(e.target.parentNode.id)
                }
            }.bind(this))
        }
        this.updateInvElement()
    }
    
    selectItem(itemNum) {
        if (itemNum < this.contents.length) {
            for (let i = 0; i < this.contents.length; i++) {
                if (i != itemNum) {
                    this.contents[i][4] = 0
                } else {
                        this.contents[itemNum][4] = 1
                        this.selectedItem = itemNum
                }
            }
        }
        this.updateInvElement()
    }
    
    removeItem() {
        this.contents.splice(this.selectedItem, 1)
        this.selectedItem = 10
        for (var i = 0; i < this.contents.length; i++) {
            this.contents[i][4] = 0
        }
        this.updateInvElement()
    }
    
    interact() {
        actionFunctions[this.contents[this.selectedItem][3]](this.contents[this.selectedItem][0], this.controls)
    }
    
    updateInvElement() {
        var invArea = document.getElementById("invArea")
        var temp = ""
        for (var i = 0; i < this.contents.length; i++) {
            if (this.contents[i][4] == 1 && this.contents[i][4]) {
                temp += '<div class="invItem invSelected" id="' + i + '"><img src="' + this.contents[i][1] + '"/></div>'
            } else {
                temp += '<div class="invItem" id="' + i + '"><img src="' + this.contents[i][1] + '"/></div>'
            }
        }
        invArea.innerHTML = temp
    }
    
    collisionsMob(scene, camera) {
        document.addEventListener("click", function (e) {
            if (e.target.parentNode.classList[0] != "invItem" && e.target.id != "startMenu") {
                this.mouse.x = (e.clientX/window.innerWidth)*2-1
                this.mouse.y = -(e.clientY/window.innerHeight)*2+1
                this.mouseRaycaster.setFromCamera(this.mouse, camera)
        	    var intersects = this.mouseRaycaster.intersectObject(scene, true)
        	    if (intersects.length > 0) {
        	        var invPossNames = invPossibilities.map(el => {
	                    return el[0]
	                })
	                if (invPossNames.includes(intersects[0].object.name) && this.contents.length < 8) {
	                    this.contents.push(structuredClone(invPossibilities[invPossNames.indexOf(intersects[0].object.name)]))
	                    this.updateInvElement()
	                }
        	       // intersects[0].object.material.color.set(0xffffff)
        	    }
            }
        }.bind(this))
    }
    
    collisionsComp(scene, camera) {
        this.mouse.x = 0
	    this.mouse.y = 0
	    this.mouseRaycaster.setFromCamera(this.mouse, camera)
	    var intersects = this.mouseRaycaster.intersectObject(scene, true)
	    document.onclick = function(e) {
	        console.log("click")
	        if (intersects.length > 0 && e.target.id != "startMenu") {
	            console.log(intersects[0])
	            var invPossNames = invPossibilities.map(el => {
	                return el[0]
	            })
	            if (invPossNames.includes(intersects[0].object.name) && this.contents.length < 8) {
	                this.contents.push(structuredClone(invPossibilities[invPossNames.indexOf(intersects[0].object.name)]))
	                this.updateInvElement()
	            }
    	       // intersects[0].object.material.color.set(0xffffff)
    	    }
	    }.bind(this)
    }
}

export {inventory}