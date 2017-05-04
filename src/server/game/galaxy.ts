import {EventEmitter} from "events";
import {Events} from "./events";

/**
 *
 * @constructor
 */
export class Galaxy extends EventEmitter {

    public players;
    private ready;
    private events: Events;
    private currentTurn;

    constructor() {
        super();
        this.players = [];
        this.currentTurn = 0;
        this.ready = false;
    }

    session(): void {
        if (this.checkWinner()) {
            this.emit(this.events.WINNER, {player: this.players[this.currentTurn]});
        }
    }

    private checkWinner(): void {

    }
}
