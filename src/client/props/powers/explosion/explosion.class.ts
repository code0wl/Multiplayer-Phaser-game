export class Explode {
    // the explosions property will be a phaser sprite
    private explosions: Phaser.Sprite;

    constructor(gameInstance, projectile) {
        // let's add the sprite and give it a graphic that we already have
        // in our start project called kaboom
        this.explosions = gameInstance.add.sprite(64, 64, 'kaboom');

        // We also have a animation which will play this kaboom! :D
        this.explosions.animations.add('kaboom');

        // We shall be needing an offset to center the explosion on our sprites
        this.explosions.reset(projectile.body.x + -20, projectile.body.y - 30);

        // Phaser offers us a play method for animations to be played and
        // will be commence as soon as the explode class is created
        this.explosions.animations.play('kaboom', 15, false);

        // after half a second of the animation playing we shall be kiling
        // the sprite to release it's burden on our memory
        setTimeout(() => {
            this.explosions.kill();
        }, 500);
    }
}