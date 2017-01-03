import { Observable, Subscription } from 'rxjs';
import { KeyBoardControl } from '../../controls/keyboard.class';

export class Player {
    score: number;
    private controls: KeyBoardControl;
    private controlsSubscription: Subscription = new Subscription();
    private coordinates: { x: number, y: number, r: number } = { x: 1, y: 1, r: 1 }; // extract to ship model
    private health: number = 100;
    private ship: HTMLImageElement;

    constructor(private id: string, private name: string) {
        this.controls = new KeyBoardControl();
    }

    render() {
        this.ship = new Image();
        this.ship.src = '../../../../assets/ship1.png';
        this.controls.bindControls();
    }
}
