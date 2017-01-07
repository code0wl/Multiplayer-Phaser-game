import { Coordinates } from './../../controls/coordinates';
import { Game } from './../../index';
import { Ship } from './../ship/ship.model';
import { Observable, Subscription } from 'rxjs';
import { KeyBoardControl } from '../../controls/keyboard.class';

export class Player {
    score: number;
    private ship: HTMLImageElement;
    private canvasRef: HTMLCanvasElement = document.querySelector('canvas');
    private contextRef: CanvasRenderingContext2D = this.canvasRef.getContext('2d');
    private controls: KeyBoardControl;
    private gameSubscription$: Subscription = new Subscription();
    private positionSubscription$: Subscription = new Subscription();
    private health: number = 100;
    public shipCoordinates: Coordinates;

    constructor(private id: string, private name: string) {
        this.controls = new KeyBoardControl();
        this.positionSubscription$ = this.controls.bindControls().map(this.move).subscribe();
        this.render();
    }

    private move = (coordinates: Coordinates) => {
        this.contextRef.save();
        this.contextRef.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);

        this.contextRef.translate(coordinates.x + this.ship.width / 2, coordinates.y + this.ship.height / 2);
        this.contextRef.rotate(coordinates.r * (Math.PI / 180));
        
        this.contextRef.drawImage(this.ship, -(this.ship.width / 2), -(this.ship.height / 2));
        this.contextRef.restore();
    }

    destroy() {
        this.positionSubscription$.unsubscribe();
        this.gameSubscription$.unsubscribe();
    }

    render() {
        this.ship = new Image();
        this.ship.src = '../../../../assets/ship1.png';
        this.controls.bindControls();
        this.ship.onload = () => {
            this.contextRef.drawImage(this.ship, 0, 0);
        }
    }
}
