import {EventEmitter} from "events";
import {Events} from "./events";

export class Galaxy extends EventEmitter {

    public players;
    private ready;
    private currentTurn;
    private events: Events;

    constructor() {
        super();
        this.players = [];
        this.currentTurn = 0;
        this.ready = false;
        this.events = new Events();
    }

    session(): void {
        if (this.checkWinner()) {
            this.emit(this.events.winner, {player: this.players[this.currentTurn]});
        }
    }

    private checkWinner(): void {

    }
}
