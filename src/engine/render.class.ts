import {LifeCycle} from "./lifecycle.class";
declare const Phaser: any;

export class Render extends LifeCycle {

    constructor() {
        super();
    }

    public createStage(): Promise<boolean> {
        return new Promise(resolve => {
            const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: super.preload, create: super.create, update: super.update});
            resolve(game);
        });
    }

}