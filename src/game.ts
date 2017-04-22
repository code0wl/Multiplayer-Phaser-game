import {Participant} from "./actors/participant/participant.class";
import {optionOne, optionTwo} from "./actors/participant/temp-ship-options";
declare const Phaser: any;

export class Game {

    private playerOne: Participant;
    private playerTwo: Participant;

    protected loadActors(gameInstance): void {
        this.playerOne = new Participant(optionOne, gameInstance);
    }

    protected playerUpdate() {
        this.playerOne.movementStream$();
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
