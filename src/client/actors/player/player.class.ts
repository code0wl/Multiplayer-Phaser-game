import {KeyBoardControl} from "../../controls/keyboard.class";
import {Projectile} from "../../props/powers/projectile/projectile.class";
import {Hud} from "../../hud/hud.class";
import {PlayerEvent} from "../../../shared/events.model";

declare const window: any;
declare const Phaser: any;

export class Player {
    public player: any;
    public storage: any;
    public projectile: Projectile;

    private angularVelocity: number = 300;
    private controls: KeyBoardControl;
    private powerUp = [];
    private playerState: Map<string, boolean>;

    constructor(private gameInstance: any, private playerInstance: any) {
        this.storage = window.localStorage;
        this.createPlayer(this.gameInstance);
        this.playerInstance = playerInstance;
        this.playerState = new Map();
    }

    public createPlayer(gameInstance): void {
        this.player = gameInstance.add.sprite(this.playerInstance.x, this.playerInstance.y, 'shooter-sprite');
        gameInstance.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.id = this.playerInstance.id;
        this.player.body.bounce.y = 0;
        this.player.enableBody = true;
        this.player.body.gravity.y = 0;
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('accelerating', [1, 0], 50, false);
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.collideWorldBounds = true;
        this.player.name = this.playerInstance.name;
        this.player.health = 100;
        Hud.view(gameInstance, this.player);
        this.assignPickup(gameInstance, this.player);
        this.addControls();
    }

    // @TODO: refactor into data stream
    public view(): void {
        this.playerState.set('fire', false);
        if (this.controls.gameControls.cursors.up.isDown) {
            this.gameInstance.physics.arcade.accelerationFromRotation(this.player.rotation, 100, this.player.body.acceleration);
            this.player.animations.play('accelerating');
            this.playerState.set('moving', true);
        } else {
            this.player.body.acceleration.set(0);
            this.playerState.set('moving', false);
        }

        if (this.controls.gameControls.cursors.left.isDown) {
            this.player.body.angularVelocity = -this.angularVelocity;
        } else if (this.controls.gameControls.cursors.right.isDown) {
            this.player.body.angularVelocity = this.angularVelocity;
        } else {
            this.player.body.angularVelocity = 0;
        }

        if (this.controls.gameControls.fireWeapon.isDown) {
            if (this.projectile) {
                this.projectile.fireWeapon();
                this.playerState.set('fire', true);
            } else {
                this.playerState.set('fire', false);
            }
        }
        this.dispatchLocation(this.player);
        this.gameInstance.physics.arcade.overlap(this.player, this.gameInstance.actors, this.checkCollision, null, this);
        console.log(this.gameInstance.actors.length);
    }

    private checkCollision(player, item): void {
        console.log(player, item);
    }

    private dispatchLocation(player): void {
        window.socket.emit(PlayerEvent.coordinates, {
            x: player.position.x,
            y: player.position.y,
            f: this.playerState.get('fire'),
            r: this.player.rotation,
            a: this.playerState.get('moving')
        });
    }

    private addControls(): void {
        this.controls = new KeyBoardControl(this.gameInstance);
    }

    private assignPickup(game, player): void {
        this.projectile = new Projectile(game, player);
        this.powerUp.push(this.projectile);
    }

}
