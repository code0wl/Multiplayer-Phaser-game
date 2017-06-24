import {Player} from './player.class';
import {PhaserSpaceGame} from '../../engine/phaser-engine.class';

describe('SpaceShip', () => {

    let player: Player;
    let game = new PhaserSpaceGame();

    it('should have an id when it is created', () => {
        expect(Player).toBeTruthy;
    });
});