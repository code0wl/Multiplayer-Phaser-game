export class Hud {

    private gameInstance: any;
    private player: any;

    constructor(gameInstance, player) {
        this.gameInstance = gameInstance;
        this.player = player;
    }

    public setName(game, player): void {
        const text = game.add.text(0, 10, player.name.substring(0, 6), {
            font: "10px Arial",
            fill: "#ffffff"
        });
        player.addChild(text);
    }

    public setAmmo(game, weapon): void {
        const text = game.add.text(0, 10, weapon.bulletCount, {
            font: "10px Arial",
            fill: "#ffffff"
        });
        this.player.addChild(text);
    }
}