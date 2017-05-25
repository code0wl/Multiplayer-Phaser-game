import {Game} from "../game/game";
import {LifeCycle} from "./lifecycle";
declare const Phaser: any;

export class PhaserSpaceGame extends Game implements LifeCycle {

    constructor() {
        super();
        this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'space-shooter', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }

    preload(): void {
        this.game.load.crossOrigin = 'anonymous';
        this.game.load.image('space', 'assets/background.jpg');
        this.game.load.image('laser', 'assets/bullet.png');
        this.game.load.spritesheet('kaboom', 'assets/explosions.png', 64, 64, 16);
        this.game.load.image('explosion', 'assets/background.jpg');
        this.game.load.image('pickup', 'assets/pickup.png');
        this.game.load.spritesheet('shooter-sprite', 'assets/ship.png', 32, 32);
    }

    create(): void {
        super.gameProperties();
        super.manageAssets();
    }

    update(): void {
        super.gameUpdate();
    }

}