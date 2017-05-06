import {KeyBoardControl} from "../../controls/keyboard.class";
import {Projectile} from "../../props/powers/projectile/projectile.class";
import {Hud} from "../../hud/hud.class";
import * as uuidV1 from "uuid";

declare const window: any;

export class Enemy {
    public player: any;
    public storage: any;
    public id: number;

    private controls: KeyBoardControl;
    private powerUp = [];
    private projectile: Projectile;

    constructor(private gameInstance: any) {
        this.storage = window.localStorage;
        this.createPlayer(this.gameInstance);
    }

    public createPlayer(gameInstance): void {
        this.player = gameInstance.add.sprite(50, 50, 'shooter-sprite');
        this.player.id = uuidV1();
        gameInstance.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('accelerating', [1, 0], 50, false);
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.collideWorldBounds = true;
        this.player.name = this.storage.getItem('name');
        this.player.health = 100;
        Hud.view(gameInstance, this.player);
        this.assignPickup(gameInstance, this.player);
    }

    private assignPickup(game, player): void {
        this.projectile = new Projectile(game, player);
        this.powerUp.push(this.projectile);
    }

}
