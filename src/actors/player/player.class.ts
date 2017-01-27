import { ShipControl } from './../../controls/ship-control.model';
import { Subscription } from 'rxjs';
import { KeyBoardControl } from '../../controls/keyboard.class';
import * as uuid from 'uuid';
import * as p2 from '../../../node_modules/p2/build/p2.min.js'; // fix export 
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
        this.render();
    }

    private controlPlayer = (coordinates: ShipControl) => {
        this.player.velocity.x = coordinates.x;
        this.player.velocity.y = coordinates.y;
    };

    public destroy() {
        this.positionSubscription$.unsubscribe();
        this.shootingSubscription$.unsubscribe();
    }

    public render() {
        console.log(p2);
        console.log('p2');
        console.log('render ship')
    }
}
