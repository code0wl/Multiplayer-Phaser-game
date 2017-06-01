export class Particle {

    private particle: Phaser.Sprite;

    constructor(gameInstance: Phaser.Game, projectile: Phaser.Sprite) {
        this.particle = gameInstance.add.sprite(64, 64, 'dust');
        this.particle.animations.add('dust');
        this.particle.reset(projectile.body.x + -20, projectile.body.y - 30);
        this.particle.animations.play('dust', 16, false);
        setTimeout(() => {
            this.particle.kill();
        }, 1000);
    }
}
