import {GameEvent, PlayerEvent} from '../../shared/events.model';
import {Player} from '../actors/player/player.class';
import {Login} from '../scenes/login';
import {Projectile} from '../props/powers/projectile/projectile.class';

declare const io: any;
declare const Phaser: any;
declare const window: any;

export class Game {
    public actors: Array<Player>;
    private actor: any;
    private projectile: Projectile;
    private authentication: Login;
    protected game: any;

    constructor() {
        window.socket = io.connect();
        this.authentication = new Login();
    }

    protected manageAssets(): void {
        this.actors = [];
        window.socket.on(PlayerEvent.joined, (player) => {
            this.actors.push(new Player(this.game, player));
        });

        window.socket.on(PlayerEvent.protagonist, (player) => {
            this.actor = new Player(this.game, player);
            this.actors.push(this.actor);
        });

        window.socket.on(PlayerEvent.players, (players) => {
            players.map((player: any) => {
                const enemy = new Player(this.game, player);
                if (player.ammo) {
                    enemy.assignPickup(this.game, enemy);
                }
                this.actors.push(enemy);
            });
        });

        window.socket.on(PlayerEvent.quit, (playerId) => {
            this.actors.map((actor) => {
                if (actor.player.id === playerId) {
                    actor.player.body.sprite.destroy();
                }
            });
        });

        window.socket.on(GameEvent.drop, (coors) => {
            if (this.projectile) {
                this.projectile.pickup.item.kill();
            }
            this.projectile = new Projectile(this.game);
            this.projectile.renderPickup(coors);
        });

        window.socket.on(PlayerEvent.hit, (enemy) => {
            this.actors.map((actor) => {
                if (this.actor.player.id === enemy) {
                    window.location.reload();
                }
            })
        });

        window.socket.on(PlayerEvent.pickup, (player) => {
            this.actors.map((actor) => {
                if (actor.player.id === player) {
                    actor.assignPickup(this.game, actor);
                }
            });
        });

        window.socket.on(PlayerEvent.coordinates, (player) => {
            this.actors.filter((actor: Player) => {
                if (actor.player.id === player.player.id) {
                    actor.player.x = player.coors.x;
                    actor.player.y = player.coors.y;
                    actor.player.rotation = player.coors.r;

                    if (player.coors.f) {
                        actor.projectile.fireWeapon();
                        actor.hud.update(player.coors.a);
                    }

                    if (player.coors.m) {
                        actor.player.animations.play('accelerating');
                    }
                }
            });
        });
    }

    protected gameUpdate(): void {
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

            this.game.physics.arcade.collide(this.actor.player, this.actors.map((actor) => actor.player));

            if (this.actor.projectile) {
                this.game.physics.arcade.collide(this.actor.projectile.weapon.bullets, this.actors.map((actor) => actor.player), (enemy, projectile) => {
                    if (enemy.id !== this.actor.player.id) {
                        this.actor.projectile.kaboom(projectile);
                        window.socket.emit(PlayerEvent.hit, enemy.id);
                        projectile.kill();
                        enemy.kill();
                    }
                });
            }

            if (this.projectile) {
                this.game.physics.arcade.overlap(this.projectile.pickup.item, this.actors.map((actor) => actor.player), (pickup, actor) => {
                    window.socket.emit(PlayerEvent.pickup, {uuid: actor.id, ammo: 10});
                    pickup.kill();
                });
            }
        }
    }

    protected gameProperties(): void {
        this.game.stage.disableVisibilityChange = true;
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
        this.game.add.sprite(0, 0, 'space');
        this.game.time.desiredFps = 60;
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

}