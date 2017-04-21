import {Player} from "./actors/player/player.class";
import {Draw} from "./engine/draw/draw.class";

export class Game {

    private space: any;
    private draw: Draw;

    public constructor() {
        this.draw = new Draw();
        this.draw.createStage()
            .then(() => this.createActors())
            .then(() => this.gameLoop())
    }

    private createActors() {
        const player = new Player('Oz', this.draw.context);
    }

    private gameLoop = () => {
        window.requestAnimationFrame(this.gameLoop);
    }
}
