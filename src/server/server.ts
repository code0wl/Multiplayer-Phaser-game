import { Socket } from "socket.io";
import { Request, Response } from "express";
import { DomainSocket, Player, SpaceShip, Coordinates } from "../shared/models";
import {
    ServerEvent,
    CometEvent,
    GameEvent,
    PlayerEvent,
} from "../shared/events.model";

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const uuid = require("uuid");

app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
    res.sendfile('./index.html');
});

class GameServer {
    private gameHasStarted: boolean = false;
    private hasComet: boolean = false;

    constructor() {
        this.socketEvents();
    }

    public connect(port: number): void {
        http.listen(port, () => {
            console.info(`Listening on port ${port}`);
        });
    }

    private socketEvents(): void {
        io.on(ServerEvent.connected, (socket: DomainSocket) => {
            this.attachListeners(socket);
        });
    }

    private attachListeners(socket: DomainSocket): void {
        this.addSignOnListener(socket);
        this.addMovementListener(socket);
        this.addSignOutListener(socket);
        this.addHitListener(socket);
        this.addCometHitListener(socket);
        this.addPickupListener(socket);
    }

    private addHitListener(socket: Socket): void {
        socket.on(PlayerEvent.hit, (playerId: string) => {
            socket.broadcast.emit(PlayerEvent.hit, playerId);
        });
    }

    private updateComet(socket: Socket) {
        if (this.hasComet) {
            let asteroidCoordinates = this.generateRandomCoordinates();
            asteroidCoordinates.y = -128;
            const update: NodeJS.Timer = setInterval(() => {
                asteroidCoordinates.y += 1;
                asteroidCoordinates.x -= 1;
                socket.emit(CometEvent.coordinates, asteroidCoordinates);
                socket.broadcast.emit(
                    CometEvent.coordinates,
                    asteroidCoordinates
                );
                this.destroyComet(asteroidCoordinates, socket, update);
            }, 25);
        }
    }

    private destroyComet(
        asteroidCoordinates: Coordinates,
        socket: Socket,
        update: NodeJS.Timer
    ): void {
        if (asteroidCoordinates.x < -128) {
            socket.emit(CometEvent.destroy);
            socket.broadcast.emit(CometEvent.destroy);
            this.hasComet = false;
            global.clearInterval(update);
        }
    }

    private addCometHitListener(socket: Socket): void {
        socket.on(CometEvent.hit, (playerId: string) => {
            socket.broadcast.emit(CometEvent.hit, playerId);
        });
    }

    private gameInitialised(socket: DomainSocket): void {
        if (!this.gameHasStarted) {
            this.gameHasStarted = true;
            this.createComet(socket, 1000);
            this.calcPickupCoordinates(socket, 5000);
        }
    }

    private calcPickupCoordinates(socket: Socket, interval: number) {
        setInterval(() => {
            const coordinates = this.generateRandomCoordinates();
            socket.emit(GameEvent.drop, coordinates);
            socket.broadcast.emit(GameEvent.drop, coordinates);
        }, interval);
    }

    private createComet(socket: DomainSocket, interval: number) {
        setInterval(() => {
            if (!this.hasComet) {
                socket.comet = {
                    id: uuid(),
                };
                this.hasComet = true;
                socket.emit(CometEvent.create, socket.comet);
                socket.broadcast.emit(CometEvent.create, socket.comet);
                this.updateComet(socket);
            }
        }, interval);
    }

    private addPickupListener(socket: DomainSocket): void {
        socket.on(PlayerEvent.pickup, (player: Player) => {
            socket.player.ammo = player.ammo;
            socket.broadcast.emit(PlayerEvent.pickup, player.uuid);
        });
    }

    private addMovementListener(socket: DomainSocket): void {
        socket.on(PlayerEvent.coordinates, (coors: Coordinates) => {
            socket.broadcast.emit(PlayerEvent.coordinates, {
                coors: coors,
                player: socket.player,
            });
        });
    }

    private addSignOutListener(socket: DomainSocket): void {
        socket.on(ServerEvent.disconnected, () => {
            if (socket.player) {
                socket.broadcast.emit(PlayerEvent.quit, socket.player.id);
            }
        });
    }

    private addSignOnListener(socket: DomainSocket): void {
        socket.on(
            GameEvent.authentication,
            (player: Player, gameSize: Coordinates) => {
                socket.emit(PlayerEvent.players, this.getAllPlayers());
                this.createPlayer(socket, player, gameSize);
                socket.emit(PlayerEvent.protagonist, socket.player);
                socket.broadcast.emit(PlayerEvent.joined, socket.player);
                this.gameInitialised(socket);
            }
        );
    }

    private createPlayer(
        socket: DomainSocket,
        player: Player,
        windowSize: Coordinates
    ): void {
        socket.player = {
            name: player.name,
            id: uuid(),
            ammo: 0,
            y: this.randomInt(0, windowSize.y),
            x: this.randomInt(0, windowSize.x),
        };
    }

    private getAllPlayers(): Array<SpaceShip> {
        return Object.keys(io.sockets.connected).reduce((acc, socketID) => {
            const player = io.sockets.connected[socketID].player;
            if (player) {
                acc.push(player);
            }
            return acc;
        }, []);
    }

    private generateRandomCoordinates(): { x: number; y: number } {
        return {
            x: Math.floor(Math.random() * 1024) + 1,
            y: Math.floor(Math.random() * 768) + 1,
        };
    }

    private randomInt(low: number, high: number): number {
        return Math.floor(Math.random() * (high - low) + low);
    }
}

const gameSession = new GameServer();

gameSession.connect(3000);
