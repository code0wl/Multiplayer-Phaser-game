declare const Phaser: any;

export class Pickup {

    public item: Phaser.Sprite;

    constructor(game, coors) {
        this.item = game.add.sprite(coors.x, coors.y, 'pickup');
        game.physics.enable(this.item, Phaser.Physics.ARCADE);
    }

}