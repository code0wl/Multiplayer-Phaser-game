declare const Phaser: any;

export class Render {

    private game: any;

    constructor() {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }

    private preload = () => {
        this.game.load.image('space', 'assets/background.jpg');
    };

    private create = () => {
        this.loadAssets();
    };

    private update = () => {
        console.log('updating');
    };

    private loadAssets() {
        this.game.add.sprite(0, 0, 'space');
    }

}