import {Player} from "./actors/player/player.class";

export class Game {

    public constructor() {
        this.loadActors();
    }

    private loadActors(): void {
        const player = new Player('Oz');
    }

    protected loadAssets(game) {
        game.add.sprite(0, 0, 'space');
    }

}
