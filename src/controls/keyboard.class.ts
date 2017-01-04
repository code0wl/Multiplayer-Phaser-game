import { Observable, Subscription } from 'rxjs';
import { Controls } from './keyboard.model';

export class KeyBoardControl {

    private controls: Observable<any>;
    private coordinates: { y: number, r: number } = {y: 1, r: 1} // extract to coordinates model
    private speed: number = 20;
    private rotateSpeed: number = 0;

    private movePlayer(key) {
        switch (key) {
            case 87:
                this.coordinates.y -= this.speed;
                break;
            case 83:
                this.coordinates.y += this.speed;
                break;
            case 65:
                this.coordinates.r -= this.rotateSpeed;
                break;
            case 68:
                this.coordinates.r += this.rotateSpeed;
                break;
        };
        return this.coordinates;
    }

    bindControls(): Observable<any> {
        return this.controls = Observable
            .fromEvent(document.body, 'keydown')
            .map((event: KeyboardEvent) => event.keyCode)
            .filter((key: number) => Object.keys(Controls).includes(key.toString())) // fixtype
            .map(key => this.movePlayer(key));
    }
}