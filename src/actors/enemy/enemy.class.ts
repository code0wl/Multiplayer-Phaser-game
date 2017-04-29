import {Player} from "../player/player.class";
import {KeyBoardControl} from "../../controls/keyboard.class";

declare const socket;

export class Enemy extends Player {
    public player: any;
    public controls: KeyBoardControl;

    constructor(gameInstance) {
        super(gameInstance);
        this.createPlayer(gameInstance);
        this.controls = null;
    }

    public view(): void {
        const playerCoors = {
            x: this.player.body.x,
            y: this.player.body.y,
            r: this.player.rotation
        };
        socket.emit('enemy:coordinates', playerCoors);
    }

}
