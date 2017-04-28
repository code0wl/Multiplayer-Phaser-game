import {Player} from "../actors/player/player.class";
import {playerOptions} from "../actors/player/player.config";

declare const Phaser: any;

export class Game {

    private player: Player;

    protected loadActors(gameInstance): void {
        this.player = new Player(playerOptions, gameInstance);
    }

    protected playerUpdate() {
        this.player.view();
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
