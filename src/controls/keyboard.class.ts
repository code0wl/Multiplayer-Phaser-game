import { Observable, Subscription } from 'rxjs';
import { Controls } from './keyboard.model';

export class KeyBoardControl {

    private controls: Observable<any>;
    private controlsSubscription: Subscription;

    private movePlayer(key) {
        switch (key) {
            case 87:
                console.log('move character up')
                break;
            case 83:
                console.log('move character down')
                break;
            case 65:
                console.log('move character left')
                break;
            case 68:
                console.log('move character right')
                break;
        };
    }

    destroy() {
        this.controlsSubscription.unsubscribe();
    }

    bindControls() {
        this.controls = Observable
            .fromEvent(document.body, 'keydown')
            .map((event: KeyboardEvent) => event.keyCode)
            .filter((key: number) => Object.keys(Controls).includes(key.toString())) // fixtype
            .map(key => this.movePlayer(key));

        this.controlsSubscription = this.controls.subscribe();
    }
}