import {Player} from "../actors/player/player.class";

declare const Phaser: any;
declare const socket: any;

export class Game {
    private player: Player;

    protected loadActors(gameInstance): void {
        socket.on('add:player', () => {
            this.player = new Player(gameInstance);
        });

        socket.on('add:enemy', () => {
            this.player = new Player(gameInstance);
        });
    }

    protected playerUpdate() {
        if (this.player) {
            this.player.view();
        }
    }

    protected gameProperties(game): void {
        game.add.sprite(0, 0, 'space');
        game.time.desiredFps = 60;
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.group().enableBody = true;
    }

}
