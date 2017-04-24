declare const Phaser;

export class Projectile {
    public game: any;
    public player: any;
    public weapon: any = {};

    public constructor(player, game) {
        this.player = player;
        this.game = game;
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    };

    public fire(): void {
        console.log('firing')
    };
}
