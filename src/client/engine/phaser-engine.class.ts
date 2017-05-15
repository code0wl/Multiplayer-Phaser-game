import {Game} from "../game/game";
import {LifeCycle} from "./lifecycle";
declare const Phaser: any;

export class PhaserSpaceGame extends Game implements LifeCycle {

    constructor() {
        super();
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'space-shooter', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }

    preload(): void {
        this.game.load.crossOrigin = 'anonymous';
        this.game.load.image('space', 'assets/background.jpg');
        this.game.load.image('laser', 'assets/laser-asset.png');
        this.game.load.spritesheet('energy', 'assets/laser-energy.png', 35, 43);
        this.game.load.spritesheet('shooter-sprite', 'assets/spaceship-asset.png', 58, 61);
    }

    create(): void {
        super.gameProperties();
        super.createActors();
    }

    update(): void {
        super.gameUpdate();
    }

}