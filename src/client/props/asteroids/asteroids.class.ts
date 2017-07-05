export class Asteroid {

    public asteroid: Phaser.Sprite;

    constructor(gameInstance) {
        this.asteroid = gameInstance.add.sprite(64, 64, 'asteroid');
        this.asteroid.animations.add('asteroid');
        this.asteroid.animations.play('asteroid', 10, true, false);
    }
}