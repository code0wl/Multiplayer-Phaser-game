// add the player class to the imports
import { Player } from "../actors/player/player.class";
import { Controls } from "./keyboard.model";
// since the keyboard will not be called inside of this file, let's export it

export class KeyBoardControl {
  public gameControls: Controls;
  // The keyboard class has two dependencies.
  // The game world and the player instance
  constructor(private gameInstance: any, private playerInstance: Player) {
    // Add the following definition of our gameControls
    this.gameControls = {
      // Keep records of the phaser's input keys in our implementation
      cursors: this.gameInstance.input.keyboard.createCursorKeys(),
      // We do not yet have the fire feature, but it's good to add the
      // functionality hook for it already. We are telling Phaser at
      // this point to react to spacebar input presses.
      fireWeapon: this.gameInstance.input.keyboard.addKey(
        Phaser.KeyCode.SPACEBAR
      )
    };
  }
  // The heartbeat of the keyboard class is being called outside.
  // The game-loop created by phaser is responsible for calling the update
  // method on every iteration. Which is what we of course hope, 60fps.
  public update(): void {
    // Wrap any logic here for when the player is alive
    if (this.playerInstance.player.alive) {
      // Update the player state if the player has fired a shot
      this.playerInstance.playerState.set("fire", false);
      // Add a const for the player velocity
      // To avoid a long method path add a small variable to capture
      // our static element of the player's velocity speed
      const vel = this.playerInstance.angularVelocity;
      // If the player is moving do the following
      if (this.gameControls.cursors.up.isDown) {
        // Get the current rotation of the player and allow the
        // player to move forward within the bounded acceleration
        // constraints
        this.gameInstance.physics.arcade.accelerationFromRotation(
          this.playerInstance.player.rotation,
          100,
          this.playerInstance.player.body.acceleration
        );
        // Let's update the state if the player is moving so we can
        // notify the game world and later the other players that
        // this current player is currently moving.
        this.playerInstance.player.animations.play("accelerating");
        this.playerInstance.playerState.set("moving", true);
      } else {
        // Our ship can only accelerate forward in space at the
        // moment, so if the player is not moving at all, we can set
        // the acceleration to 0 and reset the moving state back to
        // false. This lets the other players and the game-world know
        // that this spaceship is not moving anymore.
        this.playerInstance.player.body.acceleration.set(0);
        this.playerInstance.playerState.set("moving", false);
      }
      // Logic for when the player is turning
      if (this.gameControls.cursors.left.isDown) {
        // Add the negative value to the Angular's velocity to
        // update the character when turning left.
        this.playerInstance.player.body.angularVelocity = -vel;
      } else if (this.gameControls.cursors.right.isDown) {
        // Add the value to the Angular's velocity to
        // update the character when turning right
        this.playerInstance.player.body.angularVelocity = vel;
      } else {
        // If the user is not turning left, nor right that means
        // that the user is currently not turning at all. So let's
        // set the current degree to 0
        this.playerInstance.player.body.angularVelocity = 0;
      }
    }
  }
}
