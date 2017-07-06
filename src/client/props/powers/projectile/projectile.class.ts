import {Pickup} from '../pickup/pickup.class';
import {Particle} from '../../particle/particle.class';

export class Projectile {
    public weapon: Phaser.Weapon;
    public bulletCount: number = 10;
    public pickup: Pickup;
    private player: Phaser.Sprite;
    private gameInstance: Phaser.Game;

    public constructor(gameInstance, player?) {
        this.gameInstance = gameInstance;
        this.weapon = gameInstance.add.weapon(this.bulletCount, 'laser');
        this.weapon.fireLimit = this.bulletCount;
        this.weapon.fireRate = 1000;
        if (player) {
            this.player = player;
            this.weapon.trackSprite(this.player, 10, 0, true);
        }
    }

    public fireWeapon() {
        this.weapon.fire();
        this.bulletCount = this.weapon.fireLimit - this.weapon.shots;
    }

    public renderPickup(coors): void {
        this.pickup = new Pickup(this.gameInstance, coors);
        new Particle(this.gameInstance, this.pickup.item);
    }
}