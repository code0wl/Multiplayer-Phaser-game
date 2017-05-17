export class Explode  {

    private explosions: any;

    constructor(gameInstance, player) {
        this.explosions = gameInstance.add.group();
        this.explosions.createMultiple(30, 'kaboom');
        this.explosions.forEach(player, gameInstance);
        this.explosions.reset(player.body.x, player.body.y);
        this.explosions.play('kaboom', 30, false, true);
        console.log(this.explosions);
    }

}