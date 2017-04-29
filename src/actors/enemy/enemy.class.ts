import {Participant} from "../player.base";

declare const socket;

export class Enemy extends Participant {
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
            this.player.rotation = coors.r;
        });
    }

}
