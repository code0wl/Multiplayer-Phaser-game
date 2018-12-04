import { Explode } from "../explosion/explosion.class";
import { Sprite, Game } from "phaser-ce";

export class Asteroid {
    public asteroid: Sprite & { id: string };
    public id: string;

    constructor(
        private readonly gameInstance: Game,
        public cometInstance: Asteroid
    ) {
        this.gameInstance = gameInstance;
        this.asteroid = gameInstance.add.sprite(
            0,
            -128,
            "asteroid"
        ) as Sprite & { id: string };
        this.asteroid.animations.add("asteroid");
        this.asteroid.animations.play("asteroid", 10, true, false);
        this.attachPhysics(gameInstance);
        this.asteroid.destroy = () => {
            new Explode(this.gameInstance, this.asteroid, true);
            this.asteroid.kill();
        };
        this.asteroid.id = this.cometInstance.id;
    }

    public hit(): void {
        this.asteroid.destroy();
    }

    private attachPhysics(gameInstance: Phaser.Game): void {
        gameInstance.physics.enable(this.asteroid, Phaser.Physics.ARCADE);
        this.asteroid.body.collideWorldBounds = false;
        this.asteroid.body.bounce.setTo(0);
        this.asteroid.body.gravity.y = 0;
        this.asteroid.body.drag.set(80);
        this.asteroid.body.maxVelocity.set(100);
        this.asteroid.body.immovable = true;
    }
}
