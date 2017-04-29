import {Player} from "../actors/player/player.class";
import {Enemy} from "../actors/enemy/enemy.class";

declare const Phaser: any;
declare const socket: any;

export class Game {
    private player: Player;
    private enemy: Enemy;

    protected loadActors(gameInstance): void {
        socket.on('player:add', () => {
            if (this.player) {
                this.enemy = new Enemy(gameInstance);
            } else {
                this.player = new Player(gameInstance);
            }
        });
    }

    protected gameUpdate() {
        if (this.player) {
            this.player.view();
        }

        if (this.enemy) {
            this.enemy.view();
        }

        console.log(this.enemy);
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
