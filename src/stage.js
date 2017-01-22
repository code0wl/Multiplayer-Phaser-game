"use strict";
const player_class_1 = require("./actors/player/player.class");
const life_cycle_1 = require("./game/life-cycle");
class Stage {
    constructor() {
        this.createActors = () => {
            setTimeout(() => {
                const player = new player_class_1.Player('1', 'Oz');
            }, 1000);
        };
        this.addPhysics = (game) => {
            setTimeout(() => {
                life_cycle_1.GameLifeCycle.create(game);
                life_cycle_1.GameLifeCycle.preload(game);
                game.physics.startSystem(Phaser.Physics.ARCADE);
                game.renderer.renderSession.roundPixels = true;
            }, 1000);
        };
        this.createStage()
            .then(this.addPhysics)
            .then(this.createActors);
    }
    gameWorld() {
        return this.game;
    }
    createStage() {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight);
        this.game.state.add('main', life_cycle_1.GameLifeCycle);
        this.game.state.start('main');
        return Promise.resolve(this.game);
    }
}
exports.Stage = Stage;
//# sourceMappingURL=stage.js.map