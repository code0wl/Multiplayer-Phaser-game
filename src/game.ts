import {Player} from "./actors/player/player.class";
import {Render} from "./engine/render.class";

export class Game {

    private render: Render;

    public constructor() {
        this.render = new Render();
        this.render.createStage()
            .then(() => this.createActors())
            .then(() => this.gameLoop())
    }

    private createActors() {
        const player = new Player('Oz');
    }

    private gameLoop = () => {
        window.requestAnimationFrame(this.gameLoop);
    }
}
