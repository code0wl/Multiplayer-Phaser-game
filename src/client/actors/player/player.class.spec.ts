import {Player} from './player.class';
import {PhaserSpaceGame} from '../../engine/phaser-engine.class';
import {PlayerStub} from './player.class.stub';

describe('SpaceShip', () => {

    let player: Player;
    let game = new PhaserSpaceGame();

    it('should have an id when it is created', () => {
        player = new Player(game.gameInstance, PlayerStub);
        expect(Player).toBeTruthy;
    });
});