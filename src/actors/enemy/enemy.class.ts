import {Hud} from "../../hud/hud.class";

declare const socket;

export class Enemy {
    public player: any;
    public offset: number;

    constructor(private gameInstance: any) {
        this.createPlayer(this.gameInstance);
        socket.on('enemy:location', (coors) => {
            this.player.position.x = coors.x;
            this.player.position.y = coors.y;
            this.player.rotation = coors.r;
        });
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
