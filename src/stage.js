"use strict";
const player_class_1 = require("./actors/player/player.class");
class Stage {
    constructor() {
        this.createActors = () => {
            const player = new player_class_1.Player('1', 'Oz');
        };
        this.gameLoop = () => {
            window.requestAnimationFrame(this.gameLoop);
        };
        this.gameLoop();
        this.createStage()
            .then(this.createActors);
    }
    gameWorld() {
        return this.contextInstance;
    }
    createStage() {
        this.game = document.createElement('canvas');
        this.contextInstance = this.game.getContext('2d');
        return Promise.resolve(document.body.appendChild(this.game));
    }
}
exports.Stage = Stage;
//# sourceMappingURL=stage.js.map