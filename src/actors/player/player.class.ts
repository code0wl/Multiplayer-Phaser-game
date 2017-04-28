import {KeyBoardControl} from "../../controls/keyboard.class";
import {Projectile} from "../../props/powers/projectile/projectile.class";
import {Hud} from "../../hud/hud.class";

export class Player {
    public player: any;
    private controls: KeyBoardControl;
    private powerUp = [];
    private projectile: Projectile;

    constructor(private gameInstance: any) {
        this.controls = new KeyBoardControl(this.gameInstance);
        this.createPlayer(this.gameInstance);
    }

    public createPlayer(gameInstance) {
        this.player = gameInstance.add.sprite(50, 50, 'shooter-sprite');
        gameInstance.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.anchor.setTo(0.5, 0.5);

        this.player.animations.add('accelerating', [1, 0], 50, false);
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.collideWorldBounds = true;
        this.player.name = window.localStorage.getItem('name');
        this.player.health = 100;
        Hud.view(gameInstance, this.player);
    }

    public view() {
        if (this.player) {
            // @TODO detect if player hits pickup and then create the weapon
            if (this.controls.gameControls.cursors.up.isDown) {
                this.gameInstance.physics.arcade.accelerationFromRotation(this.player.rotation, 100, this.player.body.acceleration);
                this.player.animations.play('accelerating');
            } else {
                this.player.body.acceleration.set(0);
            }

            if (this.controls.gameControls.cursors.left.isDown) {
                this.player.body.angularVelocity = -300;
            }

            else if (this.controls.gameControls.cursors.right.isDown) {
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

    }

    private assignPickup(game, player) {
        this.projectile = new Projectile(game, player);
        this.powerUp.push(this.projectile);
    }

}
