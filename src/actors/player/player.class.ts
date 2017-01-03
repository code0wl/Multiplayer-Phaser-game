import { Observable, Subscription } from 'rxjs';
import { KeyBoardControl } from '../../controls/keyboard.class';

export class Player {
    score: number;
    ship: HTMLImageElement;
    private canvasRef: HTMLCanvasElement = document.querySelector('canvas');
    private contextRef: CanvasRenderingContext2D = this.canvasRef.getContext('2d');
    private controls: KeyBoardControl;
    private positionSubscription: Subscription = new Subscription();
    private coordinates: { x: number, y: number, r: number } = { x: 1, y: 1, r: 1 }; // extract to ship model
    private health: number = 100;

    constructor(private id: string, private name: string) {
        this.controls = new KeyBoardControl();
        this.render();
        this.positionSubscription = this.controls.bindControls().subscribe(x => console.log(x))
    }

    destroyPlayer() {
        this.positionSubscription.unsubscribe();
    }

    render() {
        this.ship = new Image();
        this.ship.src = '../../../../assets/ship1.png';
        this.controls.bindControls();
        this.ship.onload = () => {
            this.contextRef.drawImage(this.ship, 100, 100);
        }
    }
}
