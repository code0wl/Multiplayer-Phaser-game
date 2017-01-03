import { Observable, Subscription } from 'rxjs';
import { Controls } from '../../controls/keyboard.model';
import { Stage } from '../../scenes/game/stage';

export class Player {
    score: number;
    private isMoving: boolean = false;
    private controls: Observable<any>;
    private controlsSubscription: Subscription = new Subscription();
    private coordinates: { x: number, y: number, r: number } = { x: 1, y: 1, r: 1 }; // extract to ship model
    private health: number = 100;
    private speed: number = 8;
    private ship: HTMLImageElement;

    constructor(private id: string, private name: string) {
        this.render();
    }

    moveShip(key) {
        switch (key) {
            case 87:
                this.coordinates.y -= this.speed;
                break;
            case 83:
                this.coordinates.y += this.speed;
                break;
            case 65:
                this.coordinates.r -= this.speed;
                break;
            case 68:
                this.coordinates.r += this.speed;
                break;
        };

        this.ship.style.transform = `rotate(${this.coordinates.r}deg) translate3d(0, ${this.coordinates.y}px, 0)`;

    }

    bindControls() {
        this.controls = Observable
            .fromEvent(document.body, 'keydown')
            .map((event: KeyboardEvent) => event.keyCode)
            .filter((key: number) => Object.keys(Controls).includes(key.toString())) // fixtype
            .map(key => this.moveShip(key));
        this.controlsSubscription = this.controls.subscribe();
    }

    destroy() {
        this.controlsSubscription.unsubscribe();
    }

    render() {
        this.ship = new Image();
        this.ship.src = '../../../../assets/ship1.png';
        Stage.contextDraw(this.ship, 100, 100);
        this.bindControls();
    }
}
