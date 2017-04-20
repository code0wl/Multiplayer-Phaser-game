import { Player } from './actors/player/player.class';
import * as p2 from '../node_modules/p2/build/p2.min.js';

export class Stage {
    private game: HTMLCanvasElement;
    private world: any;
    private contextInstance: CanvasRenderingContext2D;

    public constructor() {
        this.createStage()
            .then(this.createActors)
            .then(this.gameLoop)
    }

    private createActors() {
        const player = new Player('1', 'Oz');
    }

    public stageContext() {
        return this.contextInstance;
    }

    public gameWorld() {
        return this.world;
    }

    private createStage() {
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

    private gameLoop = () => {
        window.requestAnimationFrame(this.gameLoop);
    }
}
