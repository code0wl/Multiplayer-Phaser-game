import {Particle} from '../../particle/particle.class';

export class Pickup {

    public item: Phaser.Sprite;
    private particle: Particle;

    constructor(game, coors) {
        this.item = game.add.sprite(coors.x, coors.y, 'pickup');
        game.physics.enable(this.item, Phaser.Physics.ARCADE);
        this.particle = new Particle(game, this.item);
    }

}