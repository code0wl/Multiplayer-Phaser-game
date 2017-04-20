import { PlayerModel } from './player.model';
import { ShipControl } from './../../controls/ship-control.model';
import { Subscription } from 'rxjs';
import { KeyBoardControl } from '../../controls/keyboard.class';
import * as uuid from 'uuid';
import { Game } from '../../index';
import * as p2 from '../../../node_modules/p2/build/p2.min.js';

export class Player {
    private controls: KeyBoardControl;
    public player: PlayerModel;
    private ship: any;
    private positionSubscription$: Subscription = new Subscription();

    constructor(private id: string, private name: string) {
        this.id = uuid();
        this.name = name;
        this.controls = new KeyBoardControl();
        this.positionSubscription$ = this.controls.move().map(this.controlPlayer).subscribe();
        this.render();
    }

    private controlPlayer = (coordinates: ShipControl) => {
        this.ship.body.applyForceLocal([0, 2]);
        this.ship.body.angularVelocity = coordinates.r;
        Game.stageContext().drawImage(this.ship.model, coordinates.x, coordinates.y);
        Game.gameWorld().step(1 / 60);
    };

    public destroy() {
        this.positionSubscription$.unsubscribe();
    }

    private attachPhysics() {
        this.ship = new p2.Circle({
            radius: 65
        });

        this.ship.body = new p2.Body({
            mass: 1,
            position: [0, 0],
            angularVelocity: 1
        });

        this.ship.collisionGroup = Math.pow(2, 1);
        Game.gameWorld().addBody(this.ship.body);
    }

    public render() {
        this.attachPhysics();
        const x = this.ship.body.position[0];
        const y = this.ship.body.position[1];

        Game.stageContext().save();
        Game.stageContext().translate(x, y);

        this.ship.model = new Image();
        this.ship.model.src = './../../../assets/ship1.png';
        this.ship.model.onload = () => {
            Game.stageContext().drawImage(this.ship.model, window.innerWidth / 2, window.innerHeight / 2, 65, 100);
        };
    }
}
