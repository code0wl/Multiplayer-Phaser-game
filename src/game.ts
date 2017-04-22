import {Participant} from "./actors/participant/participant.class";
declare const Phaser: any;

export class Game {

    private cursors: any;
    private playerOne: Participant;

    protected loadActors(gameInstance): void {
        // move to ship creation class
        this.playerOne = new Participant(gameInstance);
    }

    protected shipMovement(arcade) {
        if (this.cursors.up.isDown) {
            arcade.accelerationFromRotation(this.playerOne.player.rotation, 200, this.playerOne.player.body.acceleration);
            this.playerOne.player.animations.play('accelerating');
        } else {
            console.log(this.playerOne);
            this.playerOne.player.body.acceleration.set(0);
        }

        if (this.cursors.left.isDown) {
            this.playerOne.player.body.angularVelocity = -300;
        }

        else if (this.cursors.right.isDown) {
            this.playerOne.player.body.angularVelocity = 300;
        } else {
            this.playerOne.player.body.angularVelocity = 0;
        }
    }

    protected gameProperties(game): void {
        this.cursors = game.input.keyboard.createCursorKeys();
        game.add.sprite(0, 0, 'space');
        game.time.desiredFps = 60;
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.group().enableBody = true;
    }

}
