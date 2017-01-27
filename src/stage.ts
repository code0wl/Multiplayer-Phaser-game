import { Observable } from 'rxjs';
import { Player } from './actors/player/player.class';

export class Stage {
    private game: HTMLCanvasElement;
    private contextInstance: CanvasRenderingContext2D;

    public constructor() {
        this.gameLoop();
        this.createStage(window.innerWidth, window.innerHeight)
            .then(this.createActors)
    }

    private createActors = () => {
        const player = new Player('1', 'Oz');
    };

    public gameWorld() {
        return this.contextInstance;
    }

    private createStage(width, height): Promise<Object> {
        this.game = document.createElement('canvas');
        this.game.width = width;
        this.game.height = height;
        this.game.style.backgroundImage = '../assets/background.jpg';
        this.contextInstance = this.game.getContext('2d');
        return Promise.resolve(document.body.appendChild(this.game));
    }

    private gameLoop = () => {
        window.requestAnimationFrame(this.gameLoop);
    }

}
