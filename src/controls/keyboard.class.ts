import { Observable, Subscription } from 'rxjs';
import { Controls } from './keyboard.model';

export class KeyBoardControl {

    private controls: Observable<any>;
    private coordinates: { x: number, y: number } = {x: 1, y: 1} // extract to ship model
    private speed: number = 20;

    private movePlayer(key) {
        switch (key) {
            case 87:
                this.coordinates.y -= this.speed;
                break;
            case 83:
                this.coordinates.y += this.speed;
                break;
            case 65:
                this.coordinates.x -= this.speed;
                break;
            case 68:
                this.coordinates.x += this.speed;
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