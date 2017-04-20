import {Controls} from "./keyboard.model";
import {ShipControl} from "./ship-control.model";
import {Observable} from "rxjs";

export class KeyBoardControl {
	private shipControl: ShipControl = {x: 0, y: 0, r: 1, f: false};
	private speed: number = 20;
	private rotateSpeed: number = 10;

	private movePlayer(key) {
		this.shipControl.f = false;
		switch (key) {
			case Controls.down:
				this.shipControl.y -= this.speed;
				break;
			case Controls.up:
				this.shipControl.y += this.speed;
				break;
			case Controls.right:
				this.shipControl.r -= this.rotateSpeed;
				break;
			case Controls.left:
				this.shipControl.r += this.rotateSpeed;
				break;
			case Controls.fire:
				this.shipControl.f = true;
				break;
		}
		return this.shipControl;
	}

	public move(): Observable<ShipControl> {
		return Observable
			.fromEvent(document.body, 'keydown')
			.map((event: KeyboardEvent) => event.keyCode)
			.filter((key: number) => Object.keys(Controls).includes(key.toString()))
			.map(key => this.movePlayer(key));
	}
}