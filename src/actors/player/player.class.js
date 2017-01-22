"use strict";
const rxjs_1 = require("rxjs");
const keyboard_class_1 = require("../../controls/keyboard.class");
const uuid = require("uuid");
class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.canvasRef = document.querySelector('canvas');
        this.contextRef = this.canvasRef.getContext('2d');
        this.gameSubscription$ = new rxjs_1.Subscription();
        this.positionSubscription$ = new rxjs_1.Subscription();
        this.shootingSubscription$ = new rxjs_1.Subscription();
        this.move = (coordinates) => {
            this.contextRef.save();
            this.contextRef.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
            this.contextRef.translate(coordinates.x + this.ship.width / 2, coordinates.y + this.ship.height / 2);
            this.contextRef.rotate(coordinates.r * (Math.PI / 180));
            this.contextRef.drawImage(this.ship, -(this.ship.width / 2), -(this.ship.height / 2));
            this.contextRef.restore();
        };
        this.id = uuid();
        this.name = name;
        this.controls = new keyboard_class_1.KeyBoardControl();
        this.positionSubscription$ = this.controls.move().map(this.move).subscribe();
        this.shootingSubscription$ = this.controls.shoot().map(this.shoot).subscribe();
        this.render();
    }
    shoot() {
        console.log('shooting');
    }
    destroy() {
        this.positionSubscription$.unsubscribe();
        this.gameSubscription$.unsubscribe();
        this.shootingSubscription$.unsubscribe();
    }
    render() {
        this.ship = new Image();
        this.ship.src = '../../../../assets/ship1.png';
        this.ship.onload = () => {
            this.contextRef.drawImage(this.ship, 0, 0);
        };
    }
}
exports.Player = Player;
//# sourceMappingURL=player.class.js.map