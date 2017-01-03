import { Observable, Subscription } from 'rxjs';
import { Controls } from './keyboard.model';

export class KeyBoardControl {

    private controls: Observable<any>;
    private controlsSubscription: Subscription;
    public coordinates: any = {};
    private speed: 20;

    private movePlayer(key) {
        switch (key) {
            case 87:
                console.log('move character up');
                this.coordinates.y += this.speed;
                break;
            case 83:
                console.log('move character down');
                this.coordinates.y -= this.speed;
                break;
            case 65:
                console.log('move character left');
                this.coordinates.x -= this.speed;
                break;
            case 68:
                console.log('move character right');
                this.coordinates.x -= this.speed;
                break;
        };
    }

    bindControls(): Observable<any> {
        return this.controls = Observable
            .fromEvent(document.body, 'keydown')
            .map((event: KeyboardEvent) => event.keyCode)
            .filter((key: number) => Object.keys(Controls).includes(key.toString())) // fixtype
            .map(key => this.movePlayer(key));
    }
}