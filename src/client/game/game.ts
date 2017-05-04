import {Player} from "../actors/player/player.class";

declare const Phaser: any;
declare const io: any;
declare const window: any;

export class Game {
    public players: Array<Player>;
    public gameState: string;
    public winner: Object;
    private player: Player;
    private game: any;

    constructor() {
        window.socket = io.connect('http://localhost:3000');
    }

    protected loadActors(gameInstance): void {
        window.socket.on('player:add', () => {
            this.player = new Player(gameInstance);
        });
    }

    protected gameUpdate() {
        if (this.player) {
            this.player.view();
        }
    }

    protected gameProperties(game): void {
        this.game = game;
        game.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'space');
        game.time.desiredFps = 60;
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.group().enableBody = true;
    }

}
