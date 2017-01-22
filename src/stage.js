"use strict";
const life_cycle_1 = require("./game/life-cycle");
class Stage {
    constructor() {
        this.createActors = () => {
            console.log('create actor');
            setTimeout(() => {
                this.playerOne = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'player');
                this.playerOne.anchor.setTo(0.5, 0.5);
                this.game.physics.arcade.enable(this.playerOne);
                this.playerOne.body.gravity.y = 1;
            }, 1000);
        };
        this.addPhysics = () => {
            console.log('create physics');
            setTimeout(() => {
                this.gameLifeCycle.create(this.game);
                this.gameLifeCycle.preload(this.game);
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.game.renderer.renderSession.roundPixels = true;
            }, 1000);
        };
        this.gameLifeCycle = new life_cycle_1.GameLifeCycle();
        this.createStage()
            .then(this.addPhysics)
            .then(this.createActors);
    }
    createStage() {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight);
        this.game.state.add('main', this.gameLifeCycle);
        this.game.state.start('main');
        return Promise.resolve(this.game);
    }
}
exports.Stage = Stage;
//# sourceMappingURL=stage.js.map