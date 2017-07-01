import {KeyBoardControl} from '../../controls/keyboard.class';
import {Projectile} from '../../props/powers/projectile/projectile.class';
import {Hud} from '../../hud/hud.class';

export class Player {
    public player: Phaser.Sprite;
    public projectile: Projectile;
    public controls: KeyBoardControl;
    public playerState: Map<string, boolean | number>;
    public hud: Hud;
    public angularVelocity: number = 300;

    constructor(private gameInstance: Phaser.Game, public playerInstance: any) {
        this.createPlayer(this.gameInstance);
        this.playerState = new Map();
    }

    public createPlayer(gameInstance): void {
        this.hud = new Hud();
        this.addControls();
        this.player = gameInstance.add.sprite(
            this.playerInstance.x,
            this.playerInstance.y,
            'shooter-sprite'
        );
        this.player.id = '1';
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('accelerating', [1, 0], 60, false);

        // will show up as 'your n' because of our name shortner logic found
        // in the hud class
        this.player.name = 'your name';

        this.attachPhysics(gameInstance);
        this.hud.setName(gameInstance, this.player);
    }

    public assignPickup(game, player?): void {
        this.projectile = new Projectile(game, player.player);
        this.hud.setAmmo(game, player.player, this.projectile);
        this.playerState.set('ammo', this.projectile.bulletCount);
    }

    public view(): void {
        this.controls.update();
        if (this.projectile) {
            this.hud.update(this.playerState.get('ammo'));
        }
    }

    private addControls(): void {
        this.controls = new KeyBoardControl(this.gameInstance, this);
    }

    private attachPhysics(gameInstance): void {
        gameInstance.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.setTo(10, 10);
        this.player.body.gravity.y = 0;
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.immovable = false;
    }
}