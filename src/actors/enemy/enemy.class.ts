import {Player} from "../player/player.class";

declare const socket;

export class Enemy extends Player {
    constructor(gameInstance) {
        super(gameInstance);
        this.createPlayer(gameInstance);
        this.setEvents();
    }

    public view(): void {
        // nothing
    }

    private setEvents(): void {
        socket.on('enemy:location', (coors) => {
            this.player.position.x = coors.x;
            this.player.position.y = coors.y;
            this.player.rotation.r = coors.r;
        });
    }

}
