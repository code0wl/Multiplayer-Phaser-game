import { Game } from "../game/game.class";
import { LifeCycle } from "./lifecycle";

export class PhaserSpaceGame extends Game implements LifeCycle {

    protected game: Phaser.Game;

    constructor() {
        super();
        this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'space-shooter', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }

    public preload(): void {
        const game = this.game.load;
        game.crossOrigin = 'anonymous';
        game.image('space', 'assets/background.jpg');
        game.image('laser', 'assets/bullet.png');
        game.spritesheet('dust', 'assets/dust.png', 64, 64, 16);
        game.spritesheet('kaboom', 'assets/explosions.png', 64, 64, 16);
        game.image('pickup', 'assets/pickup.png');
        game.spritesheet('shooter-sprite', 'assets/ship.png', 32, 32);
    }

    public create(): void {
        super.properties(this.game);
        super.manageAssets(this.game);
    }

    public update(): void {
        super.gameUpdate(this.game);
    }

}