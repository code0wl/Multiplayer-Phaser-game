export class Hud {

    private label_score: any;

    constructor(game, player) {
        this.view(game, player);
    }

    private view(game, player) {
        const style = { font: "10px Arial", fill: "#ffffff" };
        this.label_score = game.add.text(0, 30, player.name, style);
        player.addChild(this.label_score);
    }
}