"use strict";
const rxjs_1 = require("rxjs");
const keyboard_model_1 = require("./keyboard.model");
const index_1 = require("../index");
class KeyBoardControl {
    constructor() {
        this.shipControl = { x: 0, y: 0, r: 1, f: false };
        this.speed = 20;
        this.rotateSpeed = 10;
        this.cursor = index_1.Game.gameWorld().input.keyboard.createCursorKeys();
    }
    movePlayer(key) {
        this.shipControl.f = false;
        switch (key) {
            case keyboard_model_1.Controls.down:
                this.shipControl.y -= this.speed;
                break;
            case keyboard_model_1.Controls.up:
                this.shipControl.y += this.speed;
                break;
            case keyboard_model_1.Controls.right:
                this.shipControl.r -= this.rotateSpeed;
                break;
            case keyboard_model_1.Controls.left:
                this.shipControl.r += this.rotateSpeed;
                break;
            case keyboard_model_1.Controls.fire:
                this.shipControl.f = true;
                break;
        }
        return this.shipControl;
    }
    move() {
        return rxjs_1.Observable
            .fromEvent(document.body, 'keydown')
            .map((event) => event.keyCode)
            .filter((key) => Object.keys(keyboard_model_1.Controls).includes(key.toString()))
            .map(key => this.movePlayer(key));
    }
}
exports.KeyBoardControl = KeyBoardControl;
//# sourceMappingURL=keyboard.class.js.map