"use strict";
const rxjs_1 = require("rxjs");
const keyboard_class_1 = require("../../controls/keyboard.class");
const uuid = require("uuid");
const index_1 = require("../../index");
class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.positionSubscription$ = new rxjs_1.Subscription();
        this.controlPlayer = (coordinates) => {
            this.player.velocity.x = coordinates.x;
            this.player.velocity.y = coordinates.y;
        };
        this.id = uuid();
        this.name = name;
        this.controls = new keyboard_class_1.KeyBoardControl();
        this.positionSubscription$ = this.controls.move().map(this.controlPlayer).subscribe();
        this.render();
    }
    destroy() {
        this.positionSubscription$.unsubscribe();
    }
    render() {
        const ship = new Image();
        ship.src = '../../../../assets/ship1.png';
        ship.onload = () => {
            index_1.Game.gameWorld().drawImage(ship, window.innerWidth / 2 * (-1), window.innerHeight / 2 * (-1), 100, 100);
        };
    }
}
exports.Player = Player;
//# sourceMappingURL=player.class.js.map