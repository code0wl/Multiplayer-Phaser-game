import {LifeCycle} from "./lifecycle.class";
declare const Phaser: any;

export class Render extends LifeCycle {

    private game: any;

    constructor() {
        super();
    }

    public createStage(): Promise<boolean> {
        return new Promise(resolve => {
            this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {preload: super.preload, create: super.create, update: super.update});
            resolve(this.game);
        });
    }

}