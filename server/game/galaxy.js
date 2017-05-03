var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 *
 * @constructor
 */
class Galaxy {
    constructor() {
        this.cells = [];
        this.players = [];
        this.currentTurn = 0;
        this.ready = false;
        this.init();
    }

    events() {
        this.ready = false;
        this.winner = 'winner';
    }

    mark(cellId) {
        if (this.checkWinner()) {
            this.emit(Board.events.WINNER, {player: this.players[this.currentTurn]});
        }
    };
}


util.inherits(Board, EventEmitter);

const galaxy = new Galaxy();

module.exports = galaxy;