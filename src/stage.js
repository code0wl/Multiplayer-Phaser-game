"use strict";
const player_class_1 = require("./actors/player/player.class");
const p2 = require("../node_modules/p2/build/p2.min.js");
class Stage {
    constructor() {
        this.gameLoop = () => {
            window.requestAnimationFrame(this.gameLoop);
        };
        this.createStage()
            .then(this.createActors)
            .then(this.gameLoop);
    }
    createActors() {
        const player = new player_class_1.Player('1', 'Oz');
    }
    stageContext() {
        return this.contextInstance;
    }
    gameWorld() {
        return this.world;
    }
    createStage() {
        return new Promise(resolve => {
            this.world = new p2.World({
                gravity: [0, 0]
            });
            const background = new Image();
            background.src = "../assets/background.jpg";
            this.game = document.createElement('canvas');
            this.game.width = window.innerWidth;
            this.game.height = window.innerHeight;
            this.contextInstance = this.game.getContext('2d');
            background.onload = () => {
                this.contextInstance.drawImage(background, 0, 0);
                resolve(document.body.appendChild(this.game));
            };
        });
    }
}
exports.Stage = Stage;
//# sourceMappingURL=stage.js.map