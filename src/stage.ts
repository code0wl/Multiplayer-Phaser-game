import { Player } from './actors/player/player.class';

export class Stage {
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    private playerOne: Player;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.loadGame();
    }

    loadGame() {
        this.playerOne = new Player('1', 'oscar');
    }

    contextAdd(element, h, w) {
        this.ctx.drawImage(element, h, w);
    }

}