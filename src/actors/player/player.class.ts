import {PlayerModel} from "./player.model";
import {ShipControl} from "./../../controls/ship-control.model";
import {Subscription} from "rxjs";
import {KeyBoardControl} from "../../controls/keyboard.class";

export class Player {
    private controls: KeyBoardControl;
    public player: PlayerModel;
    private ship: any = {};
    private coordinates = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    private shipWidth: number = 100;
    private shipHeight: number = 65;
    private positionSubscription$: Subscription = new Subscription();

    constructor(private name: string) {
        this.name = name;
        this.controls = new KeyBoardControl();
        this.positionSubscription$ = this.controls.move().map(this.controlPlayer).subscribe();
        this.render();
    }

    private controlPlayer = (coordinates: ShipControl) => {
        // this.gameContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // this.gameContext.drawImage(this.ship.model, this.coordinates.x + coordinates.x, this.coordinates.y + coordinates.y, this.shipHeight, this.shipWidth);
    };

    public destroy() {
        this.positionSubscription$.unsubscribe();
    }

    public render() {
        this.ship.model = new Image();
        this.ship.model.src = './../../../assets/ship1.png';
        this.ship.model.onload = () => {
            // this.gameContext.drawImage(this.ship.model, this.coordinates.x, this.coordinates.y, this.shipHeight, this.shipWidth);
        };
    }
}
