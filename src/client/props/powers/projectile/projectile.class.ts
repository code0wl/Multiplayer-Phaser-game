import {Explode} from "../explosion/explosion.class";
declare const Phaser;

export class Projectile {
    public weapon: any;
    public bulletCount: number = 10;
    private gameInstance: any;

    public constructor(gameInstance, player) {
        this.gameInstance = gameInstance;
        this.weapon = gameInstance.add.weapon(10, 'laser');
        this.weapon.enableBody = true;
        this.weapon.fireLimit = this.bulletCount;
        this.weapon.fireRate = 1000;
        this.weapon.physicsBodyType = Phaser.Physics.ARCADE;
        this.weapon.trackSprite(player, 10, 0, true);
    }

    public fireWeapon() {
        this.weapon.fire();
        this.bulletCount = this.weapon.fireLimit - this.weapon.shots;
    }

    public kaboom(projectile) {
        new Explode(this.gameInstance, projectile);
    }
}
