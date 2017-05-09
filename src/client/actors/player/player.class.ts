import {KeyBoardControl} from "../../controls/keyboard.class";
import {Projectile} from "../../props/powers/projectile/projectile.class";
import {Hud} from "../../hud/hud.class";
import * as uuidV1 from "uuid";
import {Broadcast} from "../../../shared/events.model";

declare const Phaser: any;
declare const window: any;

export class Player {
    public player: any;
    public storage: any;
    public id: number;

    private angularVelocity: number = 300;
    private controls: KeyBoardControl;
    private powerUp = [];
    private projectile: Projectile;

    constructor(private gameInstance: any) {
        this.storage = window.localStorage;
        this.createPlayer(this.gameInstance);
    }

    public createPlayer(gameInstance): void {
        this.player = gameInstance.add.sprite(50, 50, 'shooter-sprite');
        this.player.id = uuidV1();
        gameInstance.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('accelerating', [1, 0], 50, false);
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.collideWorldBounds = true;
        this.player.name = this.storage.getItem('name');
        this.player.health = 100;
        Hud.view(gameInstance, this.player);
        this.assignPickup(gameInstance, this.player);
        this.addControls();
    }

    public view(): void {
        if (this.controls.gameControls.cursors.up.isDown) {
            this.gameInstance.physics.arcade.accelerationFromRotation(this.player.rotation, 100, this.player.body.acceleration);
            this.player.animations.play('accelerating');
        } else {
            this.player.body.acceleration.set(0);
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
            }
        }

        window.socket.emit(Broadcast.coordinates, {
            x: this.player.body.x,
            y: this.player.body.y,
            r: this.player.rotation
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
