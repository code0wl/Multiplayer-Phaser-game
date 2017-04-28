import {Player} from "../actors/player/player.class";
import {optionOne} from "../actors/player/temp-ship-options";

declare const Phaser: any;

export class Game {

    private playerOne: Player;

    protected loadActors(gameInstance): void {

        this.playerOne = new Player(optionOne, gameInstance);
    }

    protected playerUpdate() {
        this.playerOne.view();
    }

    protected gameProperties(game): void {
        game.add.sprite(0, 0, 'space');
        game.time.desiredFps = 60;
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.group().enableBody = true;
    }

}
