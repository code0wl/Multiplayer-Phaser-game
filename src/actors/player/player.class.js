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
        this.shootingSubscription$ = new rxjs_1.Subscription();
        this.controlPlayer = (coordinates) => {
            console.log(coordinates);
            this.player.body.velocity.x = coordinates.x;
            this.player.body.velocity.y = coordinates.y;
        };
        this.id = uuid();
        this.name = name;
        this.controls = new keyboard_class_1.KeyBoardControl();
        this.positionSubscription$ = this.controls.move().map(this.controlPlayer).subscribe();
        this.player = index_1.Game.gameWorld().add.sprite(index_1.Game.gameWorld().width / 2, index_1.Game.gameWorld().height / 2, 'player');
        this.render();
    }
    destroy() {
        this.positionSubscription$.unsubscribe();
        this.shootingSubscription$.unsubscribe();
    }
    render() {
        this.player.anchor.setTo(0.5, 0.5);
        index_1.Game.gameWorld().physics.arcade.enable(this.player);
        this.player.body.gravity.y = 1;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.class.js.map