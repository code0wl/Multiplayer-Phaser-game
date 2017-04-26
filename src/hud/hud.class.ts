export class Hud {
    static view(game, player): void {
        const name = game.add.text(0, 30, player.name, {
            align: "center",
            font: "10px Arial",
            fill: "#ffffff"
        });
        player.addChild(name);
    }
}