import {Player} from "./actors/player/player.class";
import {Draw} from "./engine/draw/draw.class";

export class Game extends Draw {

    private space: any;

    public constructor() {
        super();
        this.createStage()
            .then(this.createActors)
            .then(this.gameLoop)
    }

    private createActors() {
        const player = new Player('Oz', super.context);
    }

    private gameLoop = () => {
        window.requestAnimationFrame(this.gameLoop);
    }
}
