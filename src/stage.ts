import { Player } from './actors/player/player.class';
import { GameLifeCycle } from './game/life-cycle';
import { Observable } from 'rxjs';

declare const Phaser;

export class Stage {
    public ctx: CanvasRenderingContext2D;
    public game: any;
    private playerOne: any;
    private gameLifeCycle: GameLifeCycle;

    public constructor() {
        this.gameLifeCycle = new GameLifeCycle();
        this.createStage()
            .then(this.addPhysics)
            .then(this.createActors)
    }

    private createActors = () => {
        console.log('create actor')
        setTimeout(() => {
            this.playerOne = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'player');
            this.playerOne.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.enable(this.playerOne);
            this.playerOne.body.gravity.y = 1;
        }, 1000);
    };

    private addPhysics = () => {
        console.log('create physics')
        setTimeout(() => {
            this.gameLifeCycle.create(this.game);
            this.gameLifeCycle.preload(this.game);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.renderer.renderSession.roundPixels = true;
        }, 1000);
    };

    private createStage(): Promise<Object> {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight);
        this.game.state.add('main', this.gameLifeCycle);
        this.game.state.start('main');
        return Promise.resolve(this.game);
    }

}
