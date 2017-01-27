import { Player } from './actors/player/player.class';
import { GameLifeCycle } from './game/life-cycle';

export class Stage {
    private game: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    public constructor() {
        this.gameLoop();
        this.createStage()
            .then(this.addPhysics)
            .then(this.createActors)
    }

    private createActors = () => {
        setTimeout(() => {
            const player = new Player('1', 'Oz');
        }, 1000);
    };

    public gameWorld() {
        return this.context;
    }

    private createStage(): Promise<Object> {
        this.game = document.createElement('canvas');
        return Promise.resolve(document.appendChild(this.game));
    }

    public gameLoop() {
        console.log('gameloop started');
        requestAnimationFrame(this.gameLoop);
    }

}
