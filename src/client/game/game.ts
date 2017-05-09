import {Receive} from "../../shared/events.model";
import {Player} from "../actors/player/player.class";

declare const Phaser: any;
declare const io: any;
declare const window: any;

export class Game {
    public players: Array<Player>;
    public gameState: string;
    public winner: Object;
    private player: Player;
    private receive: Receive;
    protected game: any;

    constructor() {
        window.socket = io.connect();
    }

    protected loadActors(): void {
        this.player = new Player(this);
        window.socket.on(Receive.joined, (player) => {
            console.log(player);
            new Player(this);
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
}