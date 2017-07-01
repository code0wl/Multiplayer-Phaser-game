import {GameEvent, PlayerEvent} from '../../shared/events.model';
import {Player} from '../actors/player/player.class';
import {Projectile} from '../props/powers/projectile/projectile.class';
import {LoginScene} from '../scenes/login';

declare const window: any;

export class Game {
    public login: LoginScene;
    private actors: Array<Player>;
    private actor: Player;
    private projectile: Projectile;

    constructor() {
        window.socket = io.connect();
        this.login = new LoginScene();
    }

    protected manageAssets(game): void {
        this.actors = [];
        window.socket.on(PlayerEvent.joined, (player) => {
            this.actors.push(new Player(game, player));
        });

        window.socket.on(PlayerEvent.protagonist, (player) => {
            this.actor = new Player(game, player);
            this.actors.push(this.actor);
        });

        window.socket.on(PlayerEvent.players, (players) => {
            players.map((player: any) => {
                const enemy = new Player(game, player);
                if (player.ammo) {
                    enemy.assignPickup(game, enemy);
                }
                this.actors.push(enemy);
            });
        });

        window.socket.on(PlayerEvent.quit, (playerId) => {
            this.actors
                .filter(actor => actor.player.id === playerId)
                .map(actor => actor.player.body.sprite.destroy());
        });

        window.socket.on(GameEvent.drop, (coors) => {
            if (this.projectile) {
                this.projectile.pickup.item.kill();
            }
            this.projectile = new Projectile(game);
            this.projectile.renderPickup(coors);
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

    protected gameUpdate(game): void {
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
                            this.actor.projectile.kaboom(projectile);
                            window.socket.emit(PlayerEvent.hit, enemy.id);
                            projectile.kill();
                            enemy.kill();
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