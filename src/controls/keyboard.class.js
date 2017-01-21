"use strict";
const rxjs_1 = require("rxjs");
const keyboard_model_1 = require("./keyboard.model");
class KeyBoardControl {
    constructor() {
        this.coordinates = { x: 0, y: 0, r: 1 };
        this.speed = 20;
        this.rotateSpeed = 10;
    }
    movePlayer(key) {
        switch (key) {
            case 87:
                this.coordinates.y -= this.speed;
                break;
            case 83:
                this.coordinates.y += this.speed;
                break;
            case 65:
                this.coordinates.r -= this.rotateSpeed;
                break;
            case 68:
                this.coordinates.r += this.rotateSpeed;
                break;
        }
        ;
        return this.coordinates;
    }
    shoot() {
        return this.fire = rxjs_1.Observable
            .fromEvent(document.body, 'keydown')
            .map((event) => event.keyCode)
            .filter((key) => key === keyboard_model_1.Controls.fire);
    }
    move() {
        return this.controls = rxjs_1.Observable
            .fromEvent(document.body, 'keydown')
            .map((event) => event.keyCode)
            .filter((key) => Object.keys(keyboard_model_1.Controls).includes(key.toString())) // fixtype
            .map(key => this.movePlayer(key));
    }
}
exports.KeyBoardControl = KeyBoardControl;
//# sourceMappingURL=keyboard.class.js.map