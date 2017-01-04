import { Subscription, Observable } from 'rxjs';
import { Player } from './actors/player/player.class';

export class Stage {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public gameLoopSubscription$: Subscription = new Subscription();
    private playerOne: Player;

    constructor() {
        this.createStage();
        this.gameLoopSubscription$ = Observable
            .interval(1000)
            .map(this.runGame)
            .subscribe(x => console.log(x));
    }

    private fitToWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    public destroy() {
        this.gameLoopSubscription$.unsubscribe()
    }

    private createActors() {
        this.playerOne = new Player('1', 'oscar');
    }

    private createStage() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.fitToWindow();
        document.body.appendChild(this.canvas);
        this.createActors();
    }

    // game loop
    runGame = () => {
        return window.requestAnimationFrame(this.runGame);
    }
}