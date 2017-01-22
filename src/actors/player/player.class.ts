import { ShipControl } from './../../controls/ship-control.model';
import { Subscription } from 'rxjs';
import { KeyBoardControl } from '../../controls/keyboard.class';
import * as uuid from 'uuid';
import { Game } from '../../index';

export class Player {
    private controls: KeyBoardControl;
    public player: any;
    private positionSubscription$: Subscription = new Subscription();
    private shootingSubscription$: Subscription = new Subscription();

    constructor(private id: string, private name: string) {
        this.id = uuid();
        this.name = name;
        this.controls = new KeyBoardControl();
        this.positionSubscription$ = this.controls.move().map(this.controlPlayer).subscribe();
        this.player = Game.gameWorld().add.sprite(Game.gameWorld().width / 2, Game.gameWorld().height / 2, 'player');
        this.render();
    }

    private controlPlayer = (coordinates: ShipControl) => {
        console.log(coordinates);
        this.player.body.velocity.x = coordinates.x;
        this.player.body.velocity.y = coordinates.y;
    };

    public destroy() {
        this.positionSubscription$.unsubscribe();
        this.shootingSubscription$.unsubscribe();
    }

    render() {
        this.player.anchor.setTo(0.5, 0.5);
        Game.gameWorld().physics.arcade.enable(this.player);
        this.player.body.gravity.y = 1;
    }
}
