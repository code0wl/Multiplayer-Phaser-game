import {Explode} from "../explosion/explosion.class";
declare const Phaser;

export class Projectile {
    public weapon: any;
    public bulletCount: number = 10;
    private gameInstance: any;

    public constructor(gameInstance, player) {
        this.gameInstance = gameInstance;
        this.weapon = gameInstance.add.weapon(this.bulletCount, 'laser');
        this.weapon.enableBody = true;
        this.weapon.physicsBodyType = Phaser.Physics.ARCADE;
        this.weapon.bulletSpeed = 200;
        this.weapon.fireRate = 1000;
        this.weapon.trackSprite(player, 10, 0, true);
    }

    public fireWeapon() {
        this.weapon.fire();
    }

    public kaboom(projectile) {
        const explode = new Explode(this.gameInstance, projectile);
    }

    // TODO: turn into stream with filter
    private detectPowerUp(type): void {
        switch (type) {
            case 'laser':
                return;
            case 'rocket':
                return;
            default:
                return;
        }
    }
}
