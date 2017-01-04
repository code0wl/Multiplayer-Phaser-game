import { Subscription, Observable } from 'rxjs';
import { Player } from './actors/player/player.class';

export class Stage {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public gameLoopSubscription$: Subscription = new Subscription();
    private gameCreation$ = new Observable();
    private playerOne: Player;

    constructor() {
        this.gameLoopSubscription$ = Observable
            .interval(1000)
            .take(10)
            .map(this.runGame)
            .subscribe();

        this.createStage().then(this.createActors);
    }

    private fitToWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    public destroy() {
        this.gameLoopSubscription$.unsubscribe();
    }

    private createActors = () => {
        this.playerOne = new Player('1', 'oscar');
    }

    private createStage(): Promise<Object> {
        const resolver = (resolve, reject) => {
            const background: HTMLImageElement = new Image();
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.fitToWindow();
            background.src = '../../../../assets/background.jpg';
            document.body.appendChild(this.canvas)
            background.onload = () => {
                resolve(this.ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height));
            }
        }
        return new Promise(resolver);
    }

    runGame = () => {
        return window.requestAnimationFrame(this.runGame);
    }

}
