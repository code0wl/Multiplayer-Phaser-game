import {Player} from "./actors/player/player.class";
import * as p2 from "../node_modules/p2/build/p2.min.js";

export class Stage {
    private game: HTMLCanvasElement;
    private space: any;
    private contextInstance: CanvasRenderingContext2D;

    public constructor() {
        this.createStage()
            .then(this.createActors)
            .then(this.gameLoop)
    }

    private createActors() {
        const player = new Player('Oz');
        console.log(player);
    }

    public stageContext() {
        return this.contextInstance;
    }

    public gameWorld() {
        return this.space;
    }

    private createStage() {
        return new Promise(resolve => {

            this.space = new p2.World({
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

    private gameLoop = () => {
        const fixedTimeStep = 1 / 60;
        this.space.step(fixedTimeStep);
        window.requestAnimationFrame(this.gameLoop);
    }
}
