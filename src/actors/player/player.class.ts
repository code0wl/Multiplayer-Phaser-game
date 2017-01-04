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

    constructor(private id: string, private name: string) {
        this.controls = new KeyBoardControl();
        this.positionSubscription$ = this.controls.bindControls().map(this.move).subscribe();
        this.render();
    }

    private move = (coordinates) => {
        this.contextRef.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.contextRef.rotate(coordinates.r);
        this.contextRef.drawImage(this.ship, coordinates.r, coordinates.y, 60, 150);
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
            this.contextRef.drawImage(this.ship, 0, 0, 60, 150);
        }
    }
}
