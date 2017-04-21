import {Player} from "./actors/player/player.class";

declare const Phaser: any;

export class Game {

    protected loadActors(game): void {
        // The player and its settings
        const player = game.add.sprite(32, 100, 'spaceship-one');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
    }

    protected gameProperties(game): void {
        game.add.sprite(0, 0, 'space');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.group().enableBody = true;
    }

}
