import { Player } from './actors/player/player.model';


export default class Game {
    constructor() {
        console.log('game scene created')
        this.gameSceneLoaded();
    }

    gameSceneLoaded() {
        this.createPlayers();
    }

    createPlayers() {
        const player1 = new Player('Oscar');
        const player2 = new Player('The dude');
        console.log(player1);
    }

}