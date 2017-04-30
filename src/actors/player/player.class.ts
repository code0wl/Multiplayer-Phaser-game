import {KeyBoardControl} from "../../controls/keyboard.class";
import {Projectile} from "../../props/powers/projectile/projectile.class";
import {Hud} from "../../hud/hud.class";
import * as uuidV1 from 'uuid';

declare const Phaser: any;
declare const window: any;

export class Player {
    public player: any;
    public storage: any;
    public id: number;

    private controls: KeyBoardControl;
    private powerUp = [];
    private projectile: Projectile;

    constructor(private gameInstance: any) {
        this.storage = window.localStorage;
        this.addControls();
        this.createPlayer(this.gameInstance);
    }

    public addControls(): void {
        this.controls = new KeyBoardControl(this.gameInstance);
    }

    public createPlayer(gameInstance) {
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
        window.socket.emit('player:created', this.player.id);
    }

    public view(): void {
        if (this.player) {
            if (this.controls.gameControls.cursors.up.isDown) {
                this.gameInstance.physics.arcade.accelerationFromRotation(this.player.rotation, 100, this.player.body.acceleration);
                this.player.animations.play('accelerating');
            } else {
                this.player.body.acceleration.set(0);
            }

            if (this.controls.gameControls.cursors.left.isDown) {
                this.player.body.angularVelocity = -300;
            } else if (this.controls.gameControls.cursors.right.isDown) {
                this.player.body.angularVelocity = 300;
            } else {
                this.player.body.angularVelocity = 0;
            }

            if (this.controls.gameControls.fireWeapon.isDown) {
                if (this.projectile) {
                    this.projectile.fireWeapon();
                }
            }
        }
        window.socket.emit('player:coordinates', {
            x: this.player.body.x,
            y: this.player.body.y,
            r: this.player.rotation
        });
    }

    private assignPickup(game, player): void {
        this.projectile = new Projectile(game, player);
        this.powerUp.push(this.projectile);
    }

}
