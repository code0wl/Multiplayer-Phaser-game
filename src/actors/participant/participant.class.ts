import {ShipControl} from "./../../controls/ship-control.model";
import {Subscription} from "rxjs";
import {KeyBoardControl} from "../../controls/keyboard.class";

export class Participant {
    private controls: KeyBoardControl;
    public player: any;
    private positionSubscription$: Subscription = new Subscription();

    constructor(private gameInstance: any) {
        this.controls = new KeyBoardControl();
        this.positionSubscription$ = this.controls.move().map(this.controlPlayer).subscribe();
        this.createPlayer(gameInstance);
    }

    private controlPlayer = (coordinates: ShipControl) => {
        console.log(coordinates);
    };

    public destroy() {
        this.positionSubscription$.unsubscribe();
    }

    // extract into factory that takes argument of which type of player 
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

}
