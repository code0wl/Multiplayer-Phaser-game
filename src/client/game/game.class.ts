import { Player } from "../actors/player/player.class";

export class Game {
  private actors: Array<Player>;
  private actor: Player;

  protected manageAssets(game): void {
    this.actors = [];
    // later will contain all of our game logic code
    this.actor = new Player(game);
  }

  protected gameUpdate(game?): void {
    if (this.actor && this.actor.controls) {
      this.actor.view();
    }
  }

  protected properties(game): void {
    game.stage.disableVisibilityChange = true;
    game.add.tileSprite(0, 0, game.width, game.height, "space");
    game.add.sprite(0, 0, "space");
    game.time.desiredFps = 60;
    game.renderer.clearBeforeRender = false;
    game.physics.startSystem(Phaser.Physics.ARCADE);
  }
}
