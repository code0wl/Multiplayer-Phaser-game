export class Particle {

    private particle: Phaser.Sprite;

    constructor(gameInstance: Phaser.Game, sprite: Phaser.Sprite) {
        this.particle = gameInstance.add.sprite(64, 64, 'dust');
        this.particle.animations.add('dust');
        this.particle.reset(sprite.body.x + -20, sprite.body.y - 30);
        this.particle.animations.play('dust', 16, false);
        setTimeout(() => {
            this.particle.kill();
        }, 1000);
    }
}
