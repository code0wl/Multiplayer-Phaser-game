import {CometEvent, GameEvent, PlayerEvent} from '../../shared/events.model';
import {Player} from '../actors/player/player.class';
import {Projectile} from '../props/powers/projectile/projectile.class';
import {LoginScene} from '../scenes/login';
import {Asteroid} from '../props/asteroid/asteroid.class';

declare const window: any;

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

    protected manageAssets(game): void {
        this.actors = [];
        this.comets = [];
        window.socket.on(PlayerEvent.joined, (player) => {
            this.actors.push(new Player(game, player, 'shooter-sprite-enemy'));
        });

        window.socket.on(PlayerEvent.protagonist, (player) => {
            this.actor = new Player(game, player, 'shooter-sprite');
            this.actors.push(this.actor);
        });

        window.socket.on(PlayerEvent.players, (players) => {
            players.map((player: any) => {
                const enemy = new Player(game, player, 'shooter-sprite-enemy');
                if (player.ammo) {
                    enemy.assignPickup(game, enemy);
                }
                this.actors.push(enemy);
            });
        });

        window.socket.on(PlayerEvent.quit, (playerId) => {
            this.actors
                .filter(actor => actor.player.id === playerId)
                .map(actor => actor.player.kill());
        });

        window.socket.on(GameEvent.drop, (coors) => {
            if (this.projectile) {
                this.projectile.pickup.item.kill();
            }
            this.projectile = new Projectile(game);
            this.projectile.renderPickup(coors);
        });

        window.socket.on(CometEvent.create, (comet) => {
            this.comet = new Asteroid(game, comet);
            this.comets.push(this.comet);
        });

        window.socket.on(CometEvent.coordinates, (coors) => {
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

        window.socket.on(PlayerEvent.hit, (enemy) => {
            this.actors
                .filter(actor => this.actor.player.id === enemy)
                .map(actor => window.location.reload());
        });

        window.socket.on(PlayerEvent.pickup, (player) => {
            this.actors
                .filter(actor => actor.player.id === player)
                .map(actor => actor.assignPickup(game, actor));

            this.projectile.pickup.item.kill();
        });

        window.socket.on(PlayerEvent.coordinates, (player) => {
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
                        actor.player.animations.play('accelerating');
                    }
                }
            });
        });
    }

    protected gameUpdate(game): void {

        if (this.comet) {
            game.physics.arcade.collide(this.comet.asteroid, this.actors.map(actor => actor.player), (comet, actor) => {
                if (actor.id !== this.actor.player.id) {
                    actor.destroy();
                    window.socket.emit(PlayerEvent.hit, actor.id);
                } else {
                    window.location.reload();
                }
            });

            if (this.actor && this.actor.projectile) {
                game.physics.arcade.collide(this.actor.projectile.weapon.bullets, this.comets.map((comet) => comet.asteroid),
                    (comet, projectile) => {
                        window.socket.emit(CometEvent.hit, comet.id);
                        projectile.kill();
                        this.comet.hit();
                    });
            }
        }

        if (this.actor && this.actor.controls) {
            this.actor.view();

            window.socket.emit(PlayerEvent.coordinates, {
                x: this.actor.player.position.x,
                y: this.actor.player.position.y,
                r: this.actor.player.rotation,
                f: this.actor.playerState.get('fire'),
                m: this.actor.playerState.get('moving'),
                a: this.actor.playerState.get('ammo')
            });

            game.physics.arcade.collide(this.actor.player, this.actors.map(actor => actor.player));

            if (this.actor.projectile) {
                game.physics.arcade.collide(this.actor.projectile.weapon.bullets, this.actors.map((actor) => actor.player),
                    (enemy, projectile) => {
                        if (enemy.id !== this.actor.player.id) {
                            window.socket.emit(PlayerEvent.hit, enemy.id);
                            projectile.kill();
                            enemy.destroy();
                        }
                    });
            }

            if (this.projectile) {
                game.physics.arcade.overlap(this.projectile.pickup.item, this.actors.map((actor) => actor.player), (pickup, actor) => {
                    this.actors
                        .filter(actorInstance => actor.id === actorInstance.player.id)
                        .map(actorInstance => actorInstance.assignPickup(game, actorInstance));

                    window.socket.emit(PlayerEvent.pickup, {
                        uuid: actor.id,
                        ammo: true
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