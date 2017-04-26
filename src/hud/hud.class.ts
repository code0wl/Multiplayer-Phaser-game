export class Hud {

    private name: any;

    constructor(game, player) {
        this.view(game, player);
    }

    private view(game, player) {
        this.name = game.add.text(0, 30, player.name, {
            align : "center",
            font: "10px Arial",
            fill: "#ffffff"
        });
        player.addChild(this.name);
    }
}