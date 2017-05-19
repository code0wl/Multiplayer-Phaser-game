import {PlayerEvent} from '../../shared/events.model';
import {Player} from '../actors/player/player.class';
import {Login} from '../scenes/login';

declare const Phaser: any;
declare const io: any;
declare const window: any;

export class Game {
    public actors: Array<Player>;
    private actor: any;
    private socket: any;
    private authentication: Login;
    protected game: any;

    constructor() {
        window.socket = io.connect() as any;
        this.authentication = new Login();
    }

    protected createActors(): void {
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
                this.actors.push(new Player(this.game, player));
            });
        });

        window.socket.on(PlayerEvent.quit, (playerId) => {
            this.actors.map((actor) => {
                if (actor.player.id === playerId) {
                    actor.player.body.sprite.destroy();
                }
            });
        });

        window.socket.on(PlayerEvent.hit, (enemy) => {
            this.actors.forEach(() => {
                if (this.actor.player.id === enemy) {
                    this.actor.projectile.kaboom(this.actor.player);
                    this.actor.player.destroy();
                    window.location.reload();
                }
            })
        });

        window.socket.on(PlayerEvent.coordinates, (player) => {
            this.actors.filter((actor) => {
                if (actor.player.id === player.player.id) {
                    actor.player.x = player.coors.x;
                    actor.player.y = player.coors.y;
                    actor.player.rotation = player.coors.r;

                    if (player.coors.f) {
                        actor.projectile.fireWeapon();
                    }

                    if (player.coors.a) {
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
                a: this.actor.playerState.get('moving')
            });

            this.game.physics.arcade.collide(this.actor.player, this.actors.map((actor) => actor.player));
            this.game.physics.arcade.collide(this.actor.projectile.weapon.bullets, this.actors.map((actor) => actor.player), (enemy, projectile) => {
                if (enemy.id !== this.actor.player.id) {
                    window.socket.emit(PlayerEvent.hit, enemy.id);
                    this.actor.projectile.kaboom(projectile);
                    enemy.kill();
                    projectile.kill();
                }
            });
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