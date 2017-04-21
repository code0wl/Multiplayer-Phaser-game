declare const Phaser: any;

export class Game {

    private player: any;
    private cursors: any;

    protected loadActors(game): void {
        // The player and its settings
        this.player = game.add.sprite(32, 100, 'spaceship-one');

        game.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.anchor.set(0.5);
        this.player.body.drag.set(100);
        this.player.rotation = 180;
        this.player.body.maxVelocity.set(200);
        this.player.body.collideWorldBounds = true;
    }

    protected shipMovement(game) {

        if (this.cursors.up.isDown) {
            game.physics.arcade.accelerationFromRotation(this.player.rotation, 200, this.player.body.acceleration);
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
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.group().enableBody = true;
    }

}
