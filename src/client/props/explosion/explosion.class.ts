export class Explode {
    private explosions: Phaser.Sprite;

    constructor(gameInstance, player) {
        this.explosions = gameInstance.add.sprite(64, 64, 'kaboom');
        this.explosions.animations.add('kaboom');
        this.explosions.reset(player.body.x + -20, player.body.y - 30);
        this.explosions.animations.play('kaboom', 15, false);
        setTimeout(() => {
            this.explosions.kill();
        }, 500);
    }
}