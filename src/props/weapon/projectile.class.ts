declare const Phaser;

export class Projectile {
    public game: any;
    public player: any;
    public type: any;

    public constructor(player, game) {
        this.player = player;
        this.game = game;
        this.type.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    };

    public fire(): void {
        console.log('firing')
    };
}
