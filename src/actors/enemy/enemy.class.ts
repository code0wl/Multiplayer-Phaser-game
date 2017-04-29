import {Player} from "../player/player.class";

declare const socket;

export class Enemy extends Player {
    public player: any;

    constructor(gameInstance) {
        super(gameInstance);
        this.createPlayer(gameInstance);
    }

    public view(): void {
        const playerCoors = {
            x: this.player.body.x,
            y: this.player.body.y,
            r: this.player.rotation
        };
        console.log(playerCoors);
        socket.emit('enemy:coordinates', playerCoors);
    }

}
