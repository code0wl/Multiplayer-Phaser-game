import { Particle } from "src/client/props/particle/particle.class";
import { Game, Weapon, Sprite } from "phaser-ce";
import { Pickup } from "src/client/props/powers/pickup/pickup.class";
import { Coordinates } from "src/shared/models";

export class Projectile {
    public weapon: Weapon;
    public bulletCount = 10;
    public pickup: Pickup;
    private readonly player: Sprite;
    private readonly gameInstance: Phaser.Game;

    public constructor(gameInstance: Game, player?: Sprite) {
        this.gameInstance = gameInstance;
        this.weapon = gameInstance.add.weapon(this.bulletCount, "laser");
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

    public renderPickup(coors: Coordinates): void {
        this.pickup = new Pickup(this.gameInstance, coors);
        new Particle(this.gameInstance, this.pickup.item);
    }
}
