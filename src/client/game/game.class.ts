export class Game {
  // since we do not have models yet. To stop your IDE from complaining
  // we shall change the types to any for now, until we have created our
  // game models.
  private actors: Array<any>;
  private actor: any;
  protected game: Phaser.Game;
  protected manageAssets(): void {}
  protected gameUpdate(): void {
    // If the actor exists in our game. let's update it!
    // We shall be making the controls in the next section when we
    // implement our keyboard class
    if (this.actor && this.actor.controls) {
      this.actor.view();
    }
  }
  protected properties(): void {
    // The properties below are mainly configurations
    // the Phaser framework offers to use.
    // Since we are making a multiplayer game it's
    // crucial we are always updating the world.
    // Removing the disability change means that our game will always be running, even if we switch
    // from windows whilst using our browsers
    this.game.stage.disableVisibilityChange = true;
    // We have preloaded the space texture, here we are setting it in
    // our game
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "space");
    this.game.add.sprite(0, 0, "space");
    // We want our game to be fast and furious! 60FPS all the things
    this.game.time.desiredFps = 60;
    // clear before render will give us better performance because we
    // have a static background
    this.game.renderer.clearBeforeRender = false;
    // Set the correct physics engine for our game and
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }
}
