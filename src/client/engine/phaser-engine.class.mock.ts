import {GameMock} from '../game/game.class.mock';

export class EngineMock extends GameMock {
    public game: Phaser.Game;

    public preload(): void {
        return;
    }

    public create(): void {
        return;
    }

    public update(): void {
        return;
    }
}