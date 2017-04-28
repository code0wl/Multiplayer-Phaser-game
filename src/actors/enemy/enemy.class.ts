import {KeyBoardControl} from "../../controls/keyboard.class";
import {Projectile} from "../../props/powers/projectile/projectile.class";
import {Hud} from "../../hud/hud.class";

declare const socket;

export class Enemy {
    public player: any;
    private projectile: Projectile;

    constructor(private gameInstance: any) {
        this.createPlayer(this.gameInstance);
    }

    public createPlayer(gameInstance) {
        this.player = gameInstance.add.sprite(50, 50, 'shooter-sprite');
        gameInstance.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.anchor.setTo(0.5, 0.5);

        this.player.animations.add('accelerating', [1, 0], 50, false);
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.collideWorldBounds = true;
        this.player.health = 100;
        Hud.view(gameInstance, this.player);
    }

}
