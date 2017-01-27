import { Player } from './actors/player/player.class';
import { log } from 'typings/dist/support/cli';

export class Stage {
    private game: HTMLCanvasElement;
    private contextInstance: CanvasRenderingContext2D;

    public constructor() {
        this.gameLoop();

        this.createStage()
            .then(this.createActors);
    }

    private createActors = () => {
        const player = new Player('1', 'Oz');
    };

    public gameWorld() {
        return this.contextInstance;
    }

    private createStage(): Promise<Object> {
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

    private gameLoop = () => {
        console.log('still running')
        window.requestAnimationFrame(this.gameLoop);
    }

}
