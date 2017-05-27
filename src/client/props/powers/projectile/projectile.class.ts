import { Explode } from '../explosion/explosion.class';
import { Pickup } from '../pickup/pickup.class';
import { Player } from '../../../actors/player/player.class';

export class Projectile {
    public weapon: Phaser.Weapon;
    public bulletCount: number = 10;
    public pickup: Pickup;
    private player: Phaser.Sprite;
    private gameInstance: Phaser.Game;

    public constructor(gameInstance, player?) {
        this.gameInstance = gameInstance;
        this.weapon = gameInstance.add.weapon(10, 'laser');
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
    }

    public kaboom(projectile) {
        new Explode(this.gameInstance, projectile);
    }
}