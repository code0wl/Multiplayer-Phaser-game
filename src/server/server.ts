import {
    CometEvent,
    GameEvent,
    PlayerEvent,
    ServerEvent
} from './../shared/events.model';
import {SpaceShip} from '../shared/models';
import Socket = SocketIO.Socket;
import Timer = NodeJS.Timer;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuid = require('uuid');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendfile(`./index.html`);
});

class GameServer {

    private gameHasStarted: boolean = false;
    private hasComet: boolean = false;

    constructor() {
        this.socketEvents();
    }

    public connect(port): void {
        http.listen(port, () => {
            console.info(`Listening on port ${port}`);
        });
    }

    private socketEvents(): void {
        io.on(ServerEvent.connected, socket => {
            this.attachListeners(socket);
        });
    }

    private attachListeners(socket): void {
        this.addSignOnListener(socket);
        this.addMovementListener(socket);
        this.addSignOutListener(socket);
        this.addHitListener(socket);
        this.addPickupListener(socket);
        this.addCometListener(socket);
    }

    private addHitListener(socket): void {
        socket.on(PlayerEvent.hit, (playerId) => {
            socket.broadcast.emit(PlayerEvent.hit, playerId);
        });
    }

    private addCometListener(socket): void {
        socket.on(CometEvent.destroy, () => {
            this.hasComet = false;
        });
    }

    private updateComet(socket) {
        let cometGenerator;
        if (this.hasComet) {
            let asteroidCoordinates = this.generateRandomCoordinates();
            asteroidCoordinates.y = -128;
            cometGenerator = setInterval(() => {
                asteroidCoordinates.y += 1;
                asteroidCoordinates.x -= 1;
                socket.emit(CometEvent.coordinates, asteroidCoordinates);
                socket.broadcast.emit(CometEvent.coordinates, asteroidCoordinates);
            }, 25);
        } else {
            global.clearInterval(cometGenerator);
        }
    }

    private gameInitialised(socket): void {
        if (!this.gameHasStarted) {
            this.gameHasStarted = true;
            setInterval(() => {
                if (!this.hasComet) {
                    this.hasComet = true;
                    socket.emit(CometEvent.create);
                    socket.broadcast.emit(CometEvent.create);
                    this.updateComet(socket);
                }
            }, 1000);

            setInterval(() => {
                const coordinates = this.generateRandomCoordinates();
                socket.emit(GameEvent.drop, coordinates);
                socket.broadcast.emit(GameEvent.drop, coordinates);
            }, 10000);
        }
    }

    private addPickupListener(socket): void {
        socket.on(PlayerEvent.pickup, (player) => {
            socket.player.ammo = player.ammo;
            socket.broadcast.emit(PlayerEvent.pickup, player.uuid);
        });
    }

    private addMovementListener(socket): void {
        socket.on(PlayerEvent.coordinates, (coors) => {
            socket.broadcast.emit(PlayerEvent.coordinates, {
                coors: coors,
                player: socket.player
            });
        });
    }

    private addSignOutListener(socket): void {
        socket.on(ServerEvent.disconnected, () => {
            if (socket.player) {
                socket.broadcast.emit(PlayerEvent.quit, socket.player.id);
            }
        });
    }

    private addSignOnListener(socket): void {
        socket.on(GameEvent.authentication, (player, gameSize) => {
            socket.emit(PlayerEvent.players, this.getAllPlayers());
            this.createPlayer(socket, player, gameSize);
            socket.emit(PlayerEvent.protagonist, socket.player);
            socket.broadcast.emit(PlayerEvent.joined, socket.player);
            this.gameInitialised(socket);
        });
    }

    private createPlayer(socket, player: SpaceShip, windowSize: { x, y }): void {
        socket.player = {
            name: player.name,
            id: uuid(),
            ammo: 0,
            x: this.randomInt(0, windowSize.x),
            y: this.randomInt(0, windowSize.y)
        };
    }

    private get players(): number {
        return Object.keys(io.sockets.connected).length;
    }

    private getAllPlayers(): Array<SpaceShip> {
        const players = [];
        Object.keys(io.sockets.connected).map((socketID) => {
            const player = io.sockets.connected[socketID].player;
            if (player) {
                players.push(player);
            }
        });
        return players;
    }

    private generateRandomCoordinates(): { x: number, y: number } {
        return {
            x: Math.floor(Math.random() * 1024) + 1,
            y: Math.floor(Math.random() * 768) + 1
        };
    }

    private randomInt(low, high): number {
        return Math.floor(Math.random() * (high - low) + low);
    }
}

const gameSession = new GameServer();

gameSession.connect(3000);
