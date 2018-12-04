import { Text, Game, Sprite } from "phaser-ce";
import { Player } from "src/client/actors/player/player.class";
import { Projectile } from "src/client/props/powers/projectile/projectile.class";

export class Hud {
    private ammo: Text;
    private name: Text;
    private style: { font: string; fill: string };

    constructor() {
        this.style = {
            font: "10px Arial",
            fill: "#ffffff",
        };
    }

    public setName(game: Game, player: Player & Sprite): void {
        this.name = game.add.text(
            0,
            10,
            player.name.substring(0, 6),
            this.style
        );
        player.addChild(this.name);
    }

    public update(ammo: number): void {
        this.ammo.setText(`${ammo ? ammo : ""}`);
    }

    public setAmmo(
        game: Game,
        player: Player & Sprite,
        weapon: Projectile
    ): void {
        if (this.ammo) {
            this.ammo.setText("");
        }
        this.ammo = game.add.text(
            0,
            25,
            weapon.bulletCount.toString(),
            this.style
        );
        player.addChild(this.ammo);
    }
}
