declare const Phaser: any;

export class Pickup {

    private item: any;

    constructor(game, coors) {
        this.item = game.add.sprite(coors.x, coors.y, 'pickup');
        this.item.enableBody = true;
        game.physics.enable(this.item, Phaser.Physics.ARCADE);
    }

}