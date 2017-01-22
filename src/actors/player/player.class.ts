import { Coordinates } from './../../controls/coordinates';
import { Subscription } from 'rxjs';
import { KeyBoardControl } from '../../controls/keyboard.class';
import * as uuid from 'uuid';

export class Player {
    private ship: HTMLImageElement;
    private canvasRef: HTMLCanvasElement = document.querySelector('canvas');
    private contextRef: CanvasRenderingContext2D = this.canvasRef.getContext('2d');
    private controls: KeyBoardControl;
    private gameSubscription$: Subscription = new Subscription();
    private positionSubscription$: Subscription = new Subscription();
    private shootingSubscription$: Subscription = new Subscription();

    constructor(private id: string, private name: string) {
        this.id = uuid();
        this.name = name;
        this.controls = new KeyBoardControl();
        this.positionSubscription$ = this.controls.move().map(this.move).subscribe();
        this.shootingSubscription$ = this.controls.shoot().map(this.shoot).subscribe();
        this.render();
    }

    private move = (coordinates: Coordinates) => {
        this.contextRef.save();
        this.contextRef.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);

        this.contextRef.translate(coordinates.x + this.ship.width / 2, coordinates.y + this.ship.height / 2);
        this.contextRef.rotate(coordinates.r * (Math.PI / 180));

        this.contextRef.drawImage(this.ship, -(this.ship.width / 2), -(this.ship.height / 2));
        this.contextRef.restore();
    };

    private shoot() {
        console.log('shooting');
    }

    destroy() {
        this.positionSubscription$.unsubscribe();
        this.gameSubscription$.unsubscribe();
        this.shootingSubscription$.unsubscribe();
    }

    render() {
        this.ship = new Image();
        this.ship.src = '../../../../assets/ship1.png';
        this.ship.onload = () => {
            this.contextRef.drawImage(this.ship, 0, 0);
        }
    }
}
