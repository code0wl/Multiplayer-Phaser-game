declare const Phaser;

export class Projectile {
    public weapon: any;
    public bulletCount: number = 10;

    public constructor(private gameInstance, private player) {
        this.weapon = this.gameInstance.add.weapon(this.bulletCount, 'laser');
        this.attachPhysics(this.gameInstance);
        this.weapon.bulletSpeed = 200;
        this.weapon.fireRate = 1000;
    }

    public fireWeapon() {
        this.weapon.fire();
    }

    private attachPhysics(gameInstance) {
        gameInstance.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.player.body.bounce.setTo(1, 1);
        this.player.enableBody = true;
        this.weapon.trackSprite(this.player, 20, 0, true);
    }

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
