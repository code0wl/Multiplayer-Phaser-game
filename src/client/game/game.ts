import {PlayerEvent} from "../../shared/events.model";
import {Player} from "../actors/player/player.class";

declare const Phaser: any;
declare const io: any;
declare const window: any;

export class Game {
    public players: Array<Player>;
    private player: Player;
    protected game: any;

    constructor() {
        window.socket = io.connect();
    }

    protected loadActors(): void {
        this.player = new Player(this, {x: 50, y: 50});

        window.socket.on(PlayerEvent.joined, (location) => {
            new Player(this, location);
        });

        window.socket.on(PlayerEvent.players, (players) => {
            players.map((player) => {
                new Player(this, player);
            });
        });
    }

    protected gameUpdate() {
        if (this.player) {
            this.player.view();
        }

        window.socket.on(PlayerEvent.quit, (id) => {
            this.removePlayer(id);
        });
    }

    private removePlayer(id): void {
        this.players.filter;
    }

    protected gameProperties(): void {
        this.game.stage.disableVisibilityChange = true;
        this.game.add.sprite(0, 0, 'space');
        this.game.time.desiredFps = 60;
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.group().enableBody = true;
    }
}