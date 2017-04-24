import {Projectile} from "./projectile.class";

export class Laser extends Projectile {

    public weapon: any;

    public constructor(player, game) {
        super(player, game);
        this.generateLaser();
    }

    private generateLaser(): void {
        this.weapon = this.game.add.weapon(-1, 'laser');
        this.weapon.trackSprite(this.player, 0, 0, true);
        this.weapon.bulletSpeed = 200;
        this.weapon.fireRate = 1000;
        return this.weapon;
    }

}