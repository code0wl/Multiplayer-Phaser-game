"use strict";
const rxjs_1 = require("rxjs");
const player_class_1 = require("./actors/player/player.class");
class Stage {
    constructor() {
        this.gameLoop$ = rxjs_1.Observable
            .interval()
            .map(this.runGame)
            .subscribe();
        rxjs_1.Observable
            .fromPromise(this.createStage())
            .map(this.createActors)
            .subscribe();
    }
    fitToWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    createActors() {
        this.players = [new player_class_1.Player('1', 'Oscar')];
    }
    createStage() {
        const resolver = (resolve, reject) => {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.fitToWindow();
            resolve(document.body.appendChild(this.canvas));
        };
        return new Promise(resolver);
    }
    runGame() {
        return window.requestAnimationFrame(this.runGame);
    }
}
exports.Stage = Stage;
//# sourceMappingURL=stage.js.map