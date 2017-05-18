export class Explode  {

    private explosions: any;

    constructor(gameInstance, projectile) {
        this.explosions = gameInstance.add.group();
        this.explosions.getFirstExists(false);
        this.explosions.createMultiple(5, 'kaboom');
        
        const explosion = this.explosions.getFirstExists(false);
        explosion.reset(projectile.body.x + -20, projectile.body.y - 20);
        explosion.play('kaboom', 5, false, true);
    }
}