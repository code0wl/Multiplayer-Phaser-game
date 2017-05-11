import {PlayerEvent} from "../../shared/events.model";
import {Player} from "../actors/player/player.class";
import {Login} from "../scenes/login";

declare const Phaser: any;
declare const io: any;
declare const window: any;

export class Game {
    public players: Array<Player>;
    private player: any;
    protected game: any;

    constructor() {
        window.socket = io.connect();
        new Login();
    }

    protected loadActors(): void {
        this.players = [];

        window.socket.on(PlayerEvent.joined, (location) => {
            new Player(this, location);
        });

        window.socket.on(PlayerEvent.mainActorJoined, (location) => {
            this.player = new Player(this, location);
        });

        window.socket.on(PlayerEvent.players, (players) => {
            players.map((player: Player) => {
                this.players.push(new Player(this, player));
            });
        });

        window.socket.on(PlayerEvent.quit, (playerId) => {
            console.log(playerId, this.players);
            if (playerId) {
                this.players = this.players.splice(this.players.indexOf(playerId), 1);
            }
        });
    }

    protected gameUpdate(): void {
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

}