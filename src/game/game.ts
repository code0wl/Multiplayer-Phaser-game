import {Player} from "../actors/player/player.class";

declare const Phaser: any;
declare const socket: any;
declare const io: any;

export class Game {
    private player: any; // make player model

    protected loadActors(gameInstance): void {
        socket.on('player:add', () => {
            this.player = new Player(gameInstance);
            socket.emit('player:created');
        });
    }

    protected gameUpdate() {
        if (this.player) {
            this.player.view();
        }
    }

    protected gameProperties(game): void {
        game.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'space');
        game.time.desiredFps = 60;
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.group().enableBody = true;
    }

}
