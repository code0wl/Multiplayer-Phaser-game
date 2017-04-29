import {KeyBoardControl} from "../../controls/keyboard.class";
import {Projectile} from "../../props/powers/projectile/projectile.class";
import {Hud} from "../../hud/hud.class";
import {Participant} from "../player.base";

declare const socket;

export class Player extends Participant {
    constructor(gameInstance: any) {
        super(gameInstance);
    }
}
