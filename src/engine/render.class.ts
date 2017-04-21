import {Game} from "../game";
declare const Phaser: any;

export class Render extends Game {

    private game: any;

    constructor() {
        super();
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }

    private preload(): void {
        this.game.load.image('space', 'assets/background.jpg');
        this.game.load.spritesheet('spaceship-one', 'assets/ship1.png');
    }

    private create(): void {
        super.gameProperties(this.game);
        super.loadActors(this.game);
    }

    private update() {
        super.shipMovement(this.game);
    }

}