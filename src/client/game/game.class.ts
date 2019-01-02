import { CometEvent, GameEvent, PlayerEvent } from "src/shared/events.model";
import * as Phaser from "phaser-ce";
import {
    Window,
    SpaceShip,
    Coordinates,
    Comet,
    Player as PlayerType,
} from "src/shared/models";
import { Game as PhaserGame } from "phaser-ce";
import { LoginScene } from "src/client/scenes/login";
import { Projectile } from "src/client/props/powers/projectile/projectile.class";
import { Player } from "src/client/actors/player/player.class";
import { Asteroid } from "src/client/props/asteroid/asteroid.class";

declare const window: Window;

export class Game {
    public login: LoginScene;
    private actors: Array<Player>;
    private comets: Array<Asteroid>;
    private comet: Asteroid;
    private actor: Player;
    private projectile: Projectile;

    constructor() {
        window.socket = io.connect();
        this.login = new LoginScene();
    }

    protected manageAssets(game: PhaserGame): void {
        this.actors = [];
        this.comets = [];
        window.socket.on(PlayerEvent.joined, (player: SpaceShip) => {
            this.actors.push(new Player(game, player, "shooter-sprite-enemy"));
        });

        window.socket.on(PlayerEvent.protagonist, (player: SpaceShip) => {
            this.actor = new Player(game, player, "shooter-sprite");
            this.actors.push(this.actor);
        });

        window.socket.on(PlayerEvent.players, (players: SpaceShip[]) => {
            players.map(player => {
                const enemy = new Player(game, player, "shooter-sprite-enemy");
                if (player.ammo) {
                    enemy.assignPickup(game, enemy);
                }
                this.actors.push(enemy);
            });
        });

        window.socket.on(PlayerEvent.quit, (playerId: string) => {
            this.actors
                .filter(actor => actor.player.id === playerId)
                .map(actor => actor.player.kill());
        });

        window.socket.on(GameEvent.drop, (coors: Coordinates) => {
            if (this.projectile) {
                this.projectile.pickup.item.kill();
            }
            this.projectile = new Projectile(game);
            this.projectile.renderPickup(coors);
        });

        window.socket.on(CometEvent.create, (comet: Asteroid) => {
            this.comet = new Asteroid(game, comet);
            this.comets.push(this.comet);
        });

        window.socket.on(CometEvent.coordinates, (coors: Coordinates) => {
            if (this.comet) {
                this.comet.asteroid.x = coors.x;
                this.comet.asteroid.y = coors.y;
            }
        });

        window.socket.on(CometEvent.destroy, () => {
            if (this.comet) {
                this.comet.asteroid.kill();
                this.comet = null;
            }
        });

        window.socket.on(CometEvent.hit, () => {
            if (this.comet) {
                this.comet.hit();
            }
        });

        window.socket.on(PlayerEvent.hit, (enemyId: string) => {
            this.actors
                .filter(() => this.actor.player.id === enemyId)
                .map(() => window.location.reload(true));
        });

        window.socket.on(PlayerEvent.pickup, (playerId: string) => {
            this.actors
                .filter(actor => actor.player.id === playerId)
                .map(actor => actor.assignPickup(game, actor));

            this.projectile.pickup.item.kill();
        });

        window.socket.on(PlayerEvent.coordinates, (player: PlayerType) => {
            this.actors.filter((actor: Player) => {
                if (actor.player.id === player.player.id) {
                    actor.player.x = player.coors.x;
                    actor.player.y = player.coors.y;
                    actor.player.rotation = player.coors.r;

                    if (actor.projectile) {
                        actor.hud.update(player.coors.a);
                    }

                    if (player.coors.f) {
                        actor.projectile.fireWeapon();
                    }

                    if (player.coors.m) {
                        actor.player.animations.play("accelerating");
                    }
                }
            });
        });
    }

    protected gameUpdate(game: Phaser.Game): void {
        if (this.comet) {
            game.physics.arcade.collide(
                this.comet.asteroid,
                this.actors.map(actor => actor.player),
                (comet: Comet, actor: Player & Phaser.Sprite) => {
                    if (actor.id !== this.actor.player.id) {
                        actor.destroy();
                        window.socket.emit(PlayerEvent.hit, actor.id);
                    } else {
                        window.location.reload(true);
                    }
                }
            );

            if (this.actor && this.actor.projectile) {
                game.physics.arcade.collide(
                    this.actor.projectile.weapon.bullets,
                    this.comets.map(comet => comet.asteroid),
                    (comet: Comet, projectile: Phaser.Sprite) => {
                        window.socket.emit(CometEvent.hit, comet.id);
                        projectile.kill();
                        this.comet.hit();
                    }
                );
            }
        }

        if (this.actor && this.actor.controls) {
            this.actor.view();

            window.socket.emit(PlayerEvent.coordinates, {
                x: this.actor.player.position.x,
                y: this.actor.player.position.y,
                r: this.actor.player.rotation,
                f: this.actor.playerState.get("fire"),
                m: this.actor.playerState.get("moving"),
                a: this.actor.playerState.get("ammo"),
            });

            game.physics.arcade.collide(
                this.actor.player,
                this.actors.map(actor => actor.player)
            );

            if (this.actor.projectile) {
                game.physics.arcade.collide(
                    this.actor.projectile.weapon.bullets,
                    this.actors.map(actor => actor.player),
                    (
                        enemy: Phaser.Sprite & Player,
                        projectile: Phaser.Sprite
                    ) => {
                        if (enemy.id !== this.actor.player.id) {
                            window.socket.emit(PlayerEvent.hit, enemy.id);
                            projectile.kill();
                            enemy.destroy();
                        }
                    }
                );
            }

            if (this.projectile) {
                game.physics.arcade.overlap(
                    this.projectile.pickup.item,
                    this.actors.map(actor => actor.player),
                    (pickup: Phaser.Sprite, actor: Player) => {
                        this.actors
                            .filter(
                                actorInstance =>
                                    actor.id === actorInstance.player.id
                            )
                            .map(actorInstance =>
                                actorInstance.assignPickup(game, actorInstance)
                            );

                        window.socket.emit(PlayerEvent.pickup, {
                            uuid: actor.id,
                            ammo: true,
                        });

                        pickup.kill();
                    }
                );
            }
        }
    }

    protected properties(game: PhaserGame): void {
        game.stage.disableVisibilityChange = true;
        game.add.tileSprite(0, 0, game.width, game.height, "space");
        game.add.sprite(0, 0, "space");
        game.time.desiredFps = 60;
        game.renderer.clearBeforeRender = false;
        game.physics.startSystem(Phaser.Physics.ARCADE);
    }
}
