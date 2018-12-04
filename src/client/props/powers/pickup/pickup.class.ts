import { Game, Sprite, Physics } from "phaser-ce";
import { Coordinates } from "src/shared/models";
import { Particle } from "src/client/props/particle/particle.class";

export class Pickup {
    public item: Sprite;
    public particle: Particle;

    constructor(game: Game, coors: Coordinates) {
        this.item = game.add.sprite(coors.x, coors.y, "pickup");
        game.physics.enable(this.item, Physics.ARCADE);
        this.particle = new Particle(game, this.item);
    }
}
