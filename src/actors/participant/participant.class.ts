import {ShipControl} from "./../../controls/ship-control.model";
import {Subscription} from "rxjs/Rx";
import {KeyBoardControl} from "../../controls/keyboard.class";
import {PlayerModel} from "./participant.model";

declare const Phaser: any;

export class Participant {
    public player: any;

    private weapon: any;
    private controls: KeyBoardControl;
    private cursors: any;
    private positionSubscription$: Subscription = new Subscription();

    constructor(private options: PlayerModel, private gameInstance: any) {
        this.controls = new KeyBoardControl();
        this.positionSubscription$ = this.controls.move().map(this.controlPlayer).subscribe();
        this.createPlayer(gameInstance, options);
        this.cursors = gameInstance.input.keyboard.createCursorKeys();
        this.fireWeapon = gameInstance.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    }

    public destroy() {
        this.positionSubscription$.unsubscribe();
    }

    public createPlayer(gameInstance, shipOptions) {
        this.player = gameInstance.add.sprite(83, 49, 'spaceship-one');
        gameInstance.physics.arcade.enable(this.player);

        this.player.animations.add('accelerating', [1, 2], 50, false);
        this.player.name = shipOptions.name;
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.anchor.setTo(0.5, 0.5);

        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.collideWorldBounds = true;
        this.createWeapon(gameInstance);
    }

    private createWeapon(game, type?) {
        this.weapon = game.add.weapon(100, 'projectile');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = 200;
        this.weapon.fireRate = 1000;
        console.log(this.weapon)
        this.weapon.trackSprite(this.player, 0, 0, true);
    }

    // turn into rxjs stream
    public movementStream$() {
        if (this.cursors.up.isDown) {
            this.gameInstance.physics.arcade.accelerationFromRotation(this.player.rotation, 100, this.player.body.acceleration);
            this.player.animations.play('accelerating');
        } else {
            this.player.body.acceleration.set(0);
        }

        if (this.cursors.left.isDown) {
            this.player.body.angularVelocity = -300;
        }

        else if (this.cursors.right.isDown) {
            this.player.body.angularVelocity = 300;
        } else {
            this.player.body.angularVelocity = 0;
        }

        if (this.fireWeapon.isDown) {
            this.weapon.fire();
        }

    }

    private controlPlayer = (coordinates: ShipControl) => {
        console.log(coordinates);
    };

}
