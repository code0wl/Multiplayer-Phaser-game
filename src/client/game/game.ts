import {PlayerEvent} from "../../shared/events.model";
import {Player} from "../actors/player/player.class";
import {Login} from "../scenes/login";

declare const Phaser: any;
declare const io: any;
declare const window: any;

export class Game {
    // fix types
    public actors: Array<Player>;

    private actor: any;
    protected game: any;

    constructor() {
        window.socket = io.connect();
        new Login();
    }

    protected createActors(): void {
        this.actors = [];

        window.socket.on(PlayerEvent.joined, (player) => {
            this.actors.push(new Player(this.game, player));
            console.log(this.actors);
        });

        window.socket.on(PlayerEvent.protagonist, (player) => {
            this.actor = new Player(this.game, player);
            this.actors.push(this.actor);
            console.log(this.actors);
        });

        window.socket.on(PlayerEvent.players, (players) => {
            players.map((player: any) => {
                this.actors.push(new Player(this.game, player));
            });
        });

        window.socket.on(PlayerEvent.quit, (playerId) => {
            this.actors.map((actor) => {
                if (actor.player.id === playerId) {
                    actor.player.kill();
                    this.actors = this.actors.splice(this.actors.indexOf(actor), -1);
                }
            });
        });

        window.socket.on(PlayerEvent.hit, (playerId) => {
            this.actors.map((actor) => {
                if (actor.player.id === playerId.enemy) {
                    actor.player.kill();
                    alert(`You have been killed by`);
                    this.actors = this.actors.splice(this.actors.indexOf(actor), -1);
                    window.location.reload();
                }
            });
        });

        // @TODO needs refactor move to movement controller
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
            this.game.physics.arcade.collide(this.actor.player, this.actors.map((actor) => actor.player));
            this.game.physics.arcade.collide(this.actor.projectile.weapon.bullets, this.actors.map((actor) => actor.player), (enemy, projectile) => {
                if (enemy.id !== this.actor.player.id) {
                    console.log('projectile', projectile);
                    window.socket.emit(PlayerEvent.hit, {enemy: enemy.id});
                    enemy.kill();
                    projectile.kill();
                }
            });
        }
    }

    protected gameProperties(): void {
        this.game.stage.disableVisibilityChange = true;
        this.game.add.sprite(0, 0, 'space');
        this.game.time.desiredFps = 60;
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

}