import {Game} from "../game";
import {LifeCycle} from "./lifecycle";
declare const Phaser: any;

export class Render extends Game implements LifeCycle {

    private game: any;

    constructor() {
        super();
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'rxjs-book', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }

    preload(): void {
        this.game.load.crossOrigin = 'anonymous';
        this.game.load.image('space', 'assets/background.jpg');
        this.game.load.spritesheet('projectile', 'assets/laser-sprite.png', 50, 30);
        this.game.load.spritesheet('spaceship-one', 'assets/ship1-sprite-small.png', 83, 49);
    }

    create(): void {
        super.gameProperties(this.game);
        super.loadActors(this.game);
    }

    update(): void {
        super.playerUpdate();
    }

}