"use strict";
const player_class_1 = require("./actors/player/player.class");
class Stage {
    constructor() {
        this.createActors = () => {
            const player = new player_class_1.Player('1', 'Oz');
        };
        this.gameLoop = () => {
            console.log('still running');
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
        return new Promise((resolve, reject) => {
            const background = new Image();
            background.src = "../assets/background.jpg";
            this.game = document.createElement('canvas');
            this.game.width = window.innerWidth;
            this.game.height = window.innerHeight;
            this.contextInstance = this.game.getContext('2d');
            background.onload = () => {
                this.contextInstance.drawImage(background, 0, 0);
            };
            resolve(document.body.appendChild(this.game));
            reject(e => console.error(e));
        });
    }
}
exports.Stage = Stage;
//# sourceMappingURL=stage.js.map