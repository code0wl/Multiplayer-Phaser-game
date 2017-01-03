import { Player } from './actors/player/player.class';

export class Stage {
    private canvas: HTMLCanvasElement = document.createElement('canvas');
    public context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    private playerOne: Player;

    constructor() {
        this.loadGame();
    }

    loadGame() {
        this.playerOne = new Player('1', 'oscar');
        this.render();
    }

    render() {
        document.body.appendChild(this.canvas);
    }
}