export class Hud {
    static view(game, player): void {
        const name = game.add.text(0, 10, player.name.substring(0, 6), {
            font: "10px Arial",
            fill: "#ffffff"
        });
        player.addChild(name);
    }
}