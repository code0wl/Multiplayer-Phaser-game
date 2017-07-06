export class Asteroid {

    public asteroid: Phaser.Sprite;

    constructor(gameInstance) {
        this.asteroid = gameInstance.add.sprite(0, -128, 'asteroid');
        this.asteroid.animations.add('asteroid');
        this.asteroid.animations.play('asteroid', 10, true, false);
        this.attachPhysics(gameInstance);
    }

    private attachPhysics(gameInstance): void {
        gameInstance.physics.enable(this.asteroid, Phaser.Physics.ARCADE);
        this.asteroid.body.collideWorldBounds = false;
        this.asteroid.body.bounce.setTo(0);
        this.asteroid.body.gravity.y = 0;
        this.asteroid.body.drag.set(80);
        this.asteroid.body.maxVelocity.set(100);
        this.asteroid.body.immovable = true;
    }
}