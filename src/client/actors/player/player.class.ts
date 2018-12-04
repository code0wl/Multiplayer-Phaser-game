import { SpaceShip, PlayerTypes } from "src/shared/models";
import { Game, Sprite } from "phaser-ce";
import { Particle } from "src/client/props/particle/particle.class";
import { KeyBoardControl } from "src/client/controls/keyboard.class";
import { Hud } from "src/client/hud/hud.class";
import { Explode } from "src/client/props/explosion/explosion.class";
import { Projectile } from "src/client/props/powers/projectile/projectile.class";

export class Player {
    public player: Player & Sprite;
    public projectile: Projectile;
    public controls: KeyBoardControl;
    public playerState: Map<string, any>;
    public hud: Hud;
    public name: string;
    public ammo: number;
    public id: string;
    public angularVelocity: number = 300;
    public particle: Particle;

    constructor(
        private gameInstance: Game,
        public playerInstance: SpaceShip,
        type: PlayerTypes
    ) {
        this.createPlayer(this.gameInstance, type);
        this.playerState = new Map();
    }

    public createPlayer(gameInstance: Game, type: PlayerTypes): void {
        this.hud = new Hud();
        this.addControls();
        this.player = gameInstance.add.sprite(
            this.playerInstance.x,
            this.playerInstance.y,
            type
        ) as Player & Sprite;
        this.player.id = this.playerInstance.id;
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add("accelerating", [1, 0], 60, false);
        this.player.name = this.playerInstance.name;
        this.attachPhysics(gameInstance);
        this.player.destroy = () => {
            new Explode(this.gameInstance, this.player);
            this.player.kill();
        };
        this.particle = new Particle(gameInstance, this.player);
        this.hud.setName(gameInstance, this.player);
    }

    public assignPickup(game: Game, player?: Player): void {
        this.projectile = new Projectile(game, player.player);
        this.hud.setAmmo(game, player.player, this.projectile);
        this.playerState.set("ammo", this.projectile.bulletCount);
    }

    public view(): void {
        this.controls.update();
        if (this.projectile) {
            this.hud.update(this.playerState.get("ammo"));
        }
    }

    private addControls(): void {
        this.controls = new KeyBoardControl(this.gameInstance, this);
    }

    private attachPhysics(gameInstance: Game): void {
        gameInstance.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.setTo(10, 10);
        this.player.body.gravity.y = 0;
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.immovable = false;
    }
}
