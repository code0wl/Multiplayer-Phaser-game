import {Player} from "../actors/participant/participant.class";
import {optionOne} from "../actors/participant/temp-ship-options";
import {PickUp} from "./pick-up.class";

declare const Phaser: any;

export class Game {

    private playerOne: Player;
    private pickUp: PickUp;

    protected loadActors(gameInstance): void {
        this.playerOne = new Player(optionOne, gameInstance);
        this.pickUp = new PickUp();
    }

    protected playerUpdate() {
        this.playerOne.movementStream();
        this.pickUp.generatePickup();
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
