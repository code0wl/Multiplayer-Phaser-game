import { PlayerModel } from './player.model';
import { ShipControl } from './../../controls/ship-control.model';
import { Subscription } from 'rxjs';
import { KeyBoardControl } from '../../controls/keyboard.class';
import * as uuid from 'uuid';
import { Game } from '../../index';
import * as p2 from '../../../node_modules/p2/build/p2.min.js';

export class Player {
    private controls: KeyBoardControl;
    public player: PlayerModel;
    private positionSubscription$: Subscription = new Subscription();

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
    }

    public render() {
        const ship = new Image();
        ship.src = '../../../../assets/ship1.png';
        
        ship.onload = () => {
            Game.gameWorld().drawImage(ship, window.innerWidth / 2 * (-1), window.innerHeight/ 2 * (-1), 100,100);
        };
    }
}
