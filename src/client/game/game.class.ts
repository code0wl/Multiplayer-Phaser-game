import {Player} from '../actors/player/player.class';
import {Projectile} from '../props/powers/projectile/projectile.class';
// import our created events
import {GameEvent, PlayerEvent} from '../../shared/events.model';
import {LoginScene} from '../scenes/login.class';

declare const window: any;

export class Game {
    public login: LoginScene;
    private actors: Array<Player>;
    private actor: Player;
    private projectile: Projectile;

    constructor() {
        window.socket = io.connect();
        // create the new instance for the login screen
        this.login = new LoginScene();
    }

    protected manageAssets(game): void {
        this.actors = [];

        // Once the server has detected that a new player has joined. We
        // shall be notifying our client to create a new player for us on
        window.socket.on(PlayerEvent.joined, (player) => {
            this.actors.push(new Player(game, player));
        });

        // Once you have joined (the protagonist) We need a special event
        // for you. This so we can determine that you are the main player in
        // your world and the others are your enemy
        window.socket.on(PlayerEvent.protagonist, (player) => {
            this.actor = new Player(game, player);
            this.actors.push(this.actor);
        });


        window.socket.on(PlayerEvent.players, (players) => {
            // If a new player or a returning player joins our game. We
            // shall collect all of the players and their current states and
            // update their clients with the data. This way what he is
            // seeing is not any different to what others are seeing
            players.map((player: any) => {
                const enemy = new Player(game, player);
                if (player.ammo) {
                    enemy.assignPickup(game, enemy);
                }
                this.actors.push(enemy);
            });
        });

        window.socket.on(PlayerEvent.quit, (playerId) => {
            // If a player dies or quits, we call the following actions on
            // the actors array.
            // first we filter who quit, or died and then move to removing
            // them from the game world
            this.actors
                .filter(actor => actor.player.id === playerId)
                .map(actor => actor.player.body.sprite.destroy());
        });

        window.socket.on(GameEvent.drop, (coors) => {
            // our server will be causing a loot drop every 10 seconds. When
            // this happens we want to act upon it.

            // if there is already a loot in our world, we shall remove it
            // before placing the new one.
            if (this.projectile) {
                this.projectile.pickup.item.kill();
            }

            // create a new loot every 10 seconds and pass the coordinates
            // sent by the server
            this.projectile = new Projectile(game);
            this.projectile.renderPickup(coors);
        });

        window.socket.on(PlayerEvent.hit, (enemy) => {
            // similar to when a player quits. We detect who the player was
            // and reload their client so they get brought back into the
            // game to try again if they dare face you again!
            this.actors
                .filter(actor => this.actor.player.id === enemy)
                .map(actor => window.location.reload());
        });

        window.socket.on(PlayerEvent.pickup, (player) => {
            // Once the projectile has been picked up, we shall assign it to
            // the user that has picked it up
            this.actors
                .filter(actor => actor.player.id === player)
                .map(actor => actor.assignPickup(game, actor));
        });

        window.socket.on(PlayerEvent.coordinates, (player) => {
            // This is the heart of our multiplayer game. Becuase here we
            // decided to keep track of all of the other players actions in
            // our gameworld. If a new player joins, he or she needs to be
            // aware of who is already in the game world and what their ammo
            // levels are. We in the industry call this, the current state.
            this.actors.filter((actor: Player) => {
                if (actor.player.id === player.player.id) {
                    actor.player.x = player.coors.x;
                    actor.player.y = player.coors.y;
                    actor.player.rotation = player.coors.r;

                    // detect if the player is shooting and update their hud
                    // accordingly
                    if (player.coors.f) {
                        actor.projectile.fireWeapon();
                        actor.hud.update(player.coors.a);
                    }

                    if (player.coors.m) {
                        // if the enemy player is moving, we shall add the
                        // moving animation to their ship. This way in our
                        // screen we do not see him moving about without any
                        // thrusters!
                        actor.player.animations.play('accelerating');
                    }
                }
            });
        });
    }

    protected gameUpdate(game): void {
        // This method is called through the Phaser engine class we have
        // created before. This means that it is running an endless loop to
        // update in real time what the characters are up to. Someone needs
        // to keep an eye on them!
        if (this.actor && this.actor.controls) {
            this.actor.view();

            // During the loop we shall constantly be emitting the state of
            // our player. Once we have a change in our coordinates or if we
            // are firing, a new event is triggered which will inturn notify
            // the server whom will notify the other connected clients
            window.socket.emit(PlayerEvent.coordinates, {
                x: this.actor.player.position.x,
                y: this.actor.player.position.y,
                r: this.actor.player.rotation,
                f: this.actor.playerState.get('fire'),
                m: this.actor.playerState.get('moving'),
                a: this.actor.playerState.get('ammo')
            });

            // In the loop we shall also check if the player collides with
            // another player. If they do, we shall make the arcade engine
            // do it's default action, which is to let them bounce off of
            // eachother becuase of the player properties we have added when
            // creating the player
            game.physics.arcade.collide(
                this.actor.player,
                this.actors.map(actor => actor.player)
            );

            // If the bullet collides to with a player, we need a way to
            // tell both the player and the bullet to destroy themselves.
            // Here we are matching if the fired bullet collided with an
            // enemy based on the id of that enemy. If so destroy both
            // sprites. Once destroyed they will notify the server so every
            // client will be updated of the event.
            if (this.actor.projectile) {
                game.physics.arcade.collide(
                    this.actor.projectile.weapon.bullets,
                    this.actors.map((actor) => actor.player),
                    (enemy, projectile) => {
                        if (enemy.id !== this.actor.player.id) {
                            // make the player explode
                            this.actor.projectile.kaboom(projectile);
                            // update the server about the player who has
                            // been hit and pass along the id
                            window.socket.emit(PlayerEvent.hit, enemy.id);

                            // destroy the sprites in the view
                            projectile.kill();
                            enemy.kill();
                        }
                    }
                );
            }

            // this time we shall be using the overlap to detect if the
            // player has picked up a projectile
            // first we detect which player it is who has overlapped with
            // the pickup.
            // then we notify all of the listeners who it was.
            // lastly we destroy the pickup
            if (this.projectile) {
                game.physics.arcade.overlap(this.projectile.pickup.item,
                    this.actors.map((actor) => actor.player),
                    (pickup, actor) => {
                        this.actors
                            .filter(actorInstance =>
                                actor.id === actorInstance.player.id
                            )
                            .map(actorInstance =>
                                actorInstance.assignPickup(game, actorInstance)
                            );
                        window.socket.emit(PlayerEvent.pickup, {
                            uuid: actor.id,
                            ammo: 10
                        });
                        pickup.kill();
                    });
            }
        }
    }

    protected properties(game): void {
        game.stage.disableVisibilityChange = true;
        game.add.tileSprite(0, 0, game.width, game.height, 'space');
        game.add.sprite(0, 0, 'space');
        game.time.desiredFps = 60;
        game.renderer.clearBeforeRender = false;
        game.physics.startSystem(Phaser.Physics.ARCADE);
    }

}