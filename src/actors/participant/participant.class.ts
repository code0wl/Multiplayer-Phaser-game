import {ShipControl} from "./../../controls/ship-control.model";
import {Subscription} from "rxjs";
import {KeyBoardControl} from "../../controls/keyboard.class";
import {PlayerModel} from "./participant.model";

export class Participant {
    public player: any;

    private controls: KeyBoardControl;
    private cursors: any;
    private positionSubscription$: Subscription = new Subscription();

    constructor(private options: PlayerModel, private gameInstance: any) {
        this.controls = new KeyBoardControl();
        this.positionSubscription$ = this.controls.move().map(this.controlPlayer).subscribe();
        this.createPlayer(gameInstance);
        this.cursors = gameInstance.input.keyboard.createCursorKeys();
    }

    public destroy() {
        this.positionSubscription$.unsubscribe();
    }

    public createPlayer(gameInstance) {
        this.player = gameInstance.add.sprite(83, 49, 'spaceship-one');
        gameInstance.physics.arcade.enable(this.player);

        this.player.animations.add('accelerating', [1, 2], 50, false);

        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.anchor.setTo(0.5, 0.5);

        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(200);
        this.player.body.collideWorldBounds = true;
    }

    // turn into rxjs stream
    public movementStream$() {
        if (this.cursors.up.isDown) {
            this.gameInstance.physics.arcade.accelerationFromRotation(this.player.rotation, 200, this.player.body.acceleration);
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
    }

    private controlPlayer = (coordinates: ShipControl) => {
        console.log(coordinates);
    };

}
