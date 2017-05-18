import {KeyBoardControl} from "../../controls/keyboard.class";
import {Projectile} from "../../props/powers/projectile/projectile.class";
import {Hud} from "../../hud/hud.class";
import {PlayerEvent} from "../../../shared/events.model";
import {Explode} from "../../props/powers/explosion/explosion.class";

declare const Phaser: any;
declare const window: any;

export class Player {
    public player: any;
    public projectile: Projectile;
    public controls: KeyBoardControl;
    public playerState: Map<string, boolean>;

    private explode: Explode;
    private hud: Hud;
    private angularVelocity: number = 300;
    private powerUps = [];

    constructor(private gameInstance: any, public playerInstance: any) {
        this.createPlayer(this.gameInstance);
        this.playerInstance = playerInstance;
        this.playerState = new Map();
    }

    public createPlayer(gameInstance): void {
        this.addControls();
        this.player = gameInstance.add.sprite(this.playerInstance.x, this.playerInstance.y, 'shooter-sprite');
        this.assignPickup(gameInstance, this.player);
        this.player.id = this.playerInstance.id;
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('accelerating', [1, 0], 50, false);
        this.player.name = this.playerInstance.name;
        this.player.health = 100;
        this.attachPhysics(gameInstance);
        this.hud = new Hud(gameInstance, this.player);
        this.addControls();
    }

    private attachPhysics(gameInstance): void {
        gameInstance.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.setTo(10, 10);
        this.player.enableBody = true;
        this.player.body.gravity.y = 0;
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.immovable = false;
    }

    public view(): void {
        this.controls.update();
    }

    private addControls(): void {
        this.controls = new KeyBoardControl(this.gameInstance, this);
    }

    private assignPickup(game, player): void {
        this.projectile = new Projectile(game, player);
        this.powerUps.push(this.projectile);
    }
}
