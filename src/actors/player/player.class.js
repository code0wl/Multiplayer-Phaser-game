"use strict";
const rxjs_1 = require("rxjs");
const keyboard_class_1 = require("../../controls/keyboard.class");
const uuid = require("uuid");
const index_1 = require("../../index");
const p2 = require("../../../node_modules/p2/build/p2.min.js");
class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.positionSubscription$ = new rxjs_1.Subscription();
        this.controlPlayer = (coordinates) => {
            this.ship.body.applyForceLocal([0, 2]);
            this.ship.body.angularVelocity = coordinates.r;
            index_1.Game.stageContext().drawImage(this.ship.model, coordinates.x, coordinates.y);
            index_1.Game.gameWorld().step(1 / 60);
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
    attachPhysics() {
        this.ship = new p2.Circle({
            radius: 65
        });
        this.ship.body = new p2.Body({
            mass: 1,
            position: [0, 0],
            angularVelocity: 1
        });
        this.ship.collisionGroup = Math.pow(2, 1);
        index_1.Game.gameWorld().addBody(this.ship.body);
    }
    render() {
        this.attachPhysics();
        const x = this.ship.body.position[0];
        const y = this.ship.body.position[1];
        index_1.Game.stageContext().save();
        index_1.Game.stageContext().translate(x, y);
        this.ship.model = new Image();
        this.ship.model.src = './../../../assets/ship1.png';
        this.ship.model.onload = () => {
            index_1.Game.stageContext().drawImage(this.ship.model, window.innerWidth / 2, window.innerHeight / 2, 65, 100);
        };
    }
}
exports.Player = Player;
//# sourceMappingURL=player.class.js.map