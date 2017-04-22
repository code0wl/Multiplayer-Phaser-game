declare const Phaser: any;

export class Game {

    private player: any;
    private cursors: any;

    protected loadActors(gameInstance): void {
        // move to ship creation class
        this.player = gameInstance.add.sprite(135, 80, 'spaceship-one');
        gameInstance.physics.arcade.enable(this.player);

        this.player.animations.add('accelerating', [1,2], 50, false);

        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.anchor.setTo(0.5, 0.5);

        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(200);
        this.player.body.collideWorldBounds = true;
    }

    protected shipMovement(arcade) {
        if (this.cursors.up.isDown) {
            arcade.accelerationFromRotation(this.player.rotation, 200, this.player.body.acceleration);
            this.player.animations.play('accelerating');
        } else {
            this.player.body.acceleration.set(0);
        }

        if (this.cursors.left.isDown) {
            this.player.body.angularVelocity = -300;
        }

        else if (this.cursors.right.isDown) {
            this.player.body.angularVelocity = 300;
        } else {
            this.player.body.angularVelocity = 0;
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
