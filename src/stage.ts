import { Player } from './actors/player/player.class';
import { GameLifeCycle } from './game/life-cycle';

declare const Phaser;

export class Stage {
    private game: any;

    public constructor() {
        this.createStage()
            .then(this.addPhysics)
            .then(this.createActors)
    }

    private createActors = () => {
        setTimeout(() => {
            const player = new Player('1', 'Oz');
        }, 1000);
    };

    private addPhysics = (game) => {
        setTimeout(() => {
            GameLifeCycle.create(game);
            GameLifeCycle.preload(game);
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.renderer.renderSession.roundPixels = true;
        }, 1000);
    };

    public gameWorld() {
        return this.game;
    }

    private createStage(): Promise<Object> {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight);
        this.game.state.add('main', GameLifeCycle);
        this.game.state.start('main');
        return Promise.resolve(this.game);
    }

}
