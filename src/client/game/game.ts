import {PlayerEvent} from "../../shared/events.model";
import {Player} from "../actors/player/player.class";
import {Login} from "../scenes/login";

declare const Phaser: any;
declare const io: any;
declare const window: any;

export class Game {
    public players: Array<Player>;
    private player: Player;
    protected game: any;

    constructor() {
        window.socket = io.connect();
        new Login();
    }

    protected loadActors(): void {
        this.player = new Player(this, {x: 50, y: 50});
        this.players = [];

        window.socket.on(PlayerEvent.joined, (location) => {
            new Player(this, location);
        });

        window.socket.on(PlayerEvent.players, (players) => {
            players.map((player: Player) => {
                this.players.push(new Player(this, player));
            });
        });

        window.socket.on(PlayerEvent.quit, (id) => {
            console.log('this player should be removed => ', id);
        });
    }

    protected gameUpdate() {
        if (this.player) {
            this.player.view();
        }
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

    private removePlayer() {

    }


}