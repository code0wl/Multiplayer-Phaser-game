import {Explode} from "../explosion/explosion.class";

export class Asteroid {

    public health: number;
    public asteroid: Phaser.Sprite;

    constructor(private gameInstance, public cometInstance) {
        this.gameInstance = gameInstance;
        this.asteroid = gameInstance.add.sprite(0, -128, 'asteroid');
        this.asteroid.animations.add('asteroid');
        this.asteroid.animations.play('asteroid', 10, true, false);
        this.attachPhysics(gameInstance);
        this.health = 100;
        this.asteroid.destroy = () => {
            new Explode(this.gameInstance, this.asteroid);
            this.asteroid.kill();
        }
        this.asteroid.id = this.cometInstance.id;
    }

    public hit(): void {
        this.health = this.health - 50;
        if (!this.health) {
            this.asteroid.destroy();
        }
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