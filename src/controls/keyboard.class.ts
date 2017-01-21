import { Coordinates } from './coordinates';
import { Observable, Subscription } from 'rxjs';
import { Controls } from './keyboard.model';

export class KeyBoardControl {
    private controls: Observable<Coordinates>;
    private fire: Observable<number>;
    private coordinates: Coordinates = { x: 0, y: 0, r: 1 };
    private speed: number = 20;
    private rotateSpeed: number = 10;

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

    shoot(): Observable<number> {
        return this.fire = Observable
            .fromEvent(document.body, 'keydown')
            .map((event: KeyboardEvent) => event.keyCode)
            .filter((key: number) => key === Controls.fire);
    }

    move(): Observable<Coordinates> {
        return this.controls = Observable
            .fromEvent(document.body, 'keydown')
            .map((event: KeyboardEvent) => event.keyCode)
            .filter((key: number) => Object.keys(Controls).includes(key.toString())) // fixtype
            .map(key => this.movePlayer(key));
    }
}