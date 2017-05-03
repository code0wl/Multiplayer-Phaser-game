declare const Phaser;

export class Projectile {
    public weapon: any;
    public bulletCount: number = 10;

    public constructor(private gameInstance, private player) {
        this.weapon = this.gameInstance.add.weapon(this.bulletCount, 'laser');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = 200;
        this.weapon.fireRate = 1000;
        this.weapon.trackSprite(this.player, 20, 0, true);
    }

    public fireWeapon() {
        this.weapon.fire();
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
