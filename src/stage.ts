import { Player } from './actors/player/player.class';

export class Stage {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    private loop: any;
    private playerOne: Player;

    constructor() {
        this.createStage();
    }

    private fitToWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
        window.requestAnimationFrame(this.runGame);
    }
}