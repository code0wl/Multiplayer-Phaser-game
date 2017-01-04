import { Subscription, Observable } from 'rxjs';
import { Player } from './actors/player/player.class';

export class Stage {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public gameLoop$: Subscription;
    private players: Array<Player>;

    constructor() {
        this.gameLoop$ = Observable
            .interval()
            .map(this.runGame)
            .subscribe();

        Observable
            .fromPromise(this.createStage())
            .map(this.createActors)
            .subscribe();
    }

    private fitToWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private createActors() {
        this.players = [new Player('1', 'Oscar')];
    }

    private createStage(): Promise<Object> {
        const resolver = (resolve, reject) => {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.fitToWindow();
            resolve(document.body.appendChild(this.canvas));
        }
        return new Promise(resolver);
    }

    runGame = () => {
        return window.requestAnimationFrame(this.runGame);
    }

}
