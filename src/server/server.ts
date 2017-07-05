import {GameEvent, PlayerEvent, ServerEvent} from './../shared/events.model';
import {SpaceShip} from '../shared/models';
import Socket = SocketIO.Socket;
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
    }

    private addHitListener(socket): void {
        socket.on(PlayerEvent.hit, (playerId) => {
            socket.broadcast.emit(PlayerEvent.hit, playerId);
        });
    }

    private addAsteroidListener(socket): void {
        let coors = this.generateRandomCoordinates();
        setInterval(() => {
            coors.y += 1;
            coors.x -= 1;
            socket.emit(GameEvent.asteroidCoodinates, coors);
            socket.broadcast.emit(GameEvent.asteroidCoodinates, coors);
        }, 10);
    }

    private gameInitialised(socket): void {
        if (!this.gameHasStarted) {
            this.gameHasStarted = true;

            setInterval(() => {
                socket.emit(GameEvent.asteroid);
                socket.broadcast.emit(GameEvent.asteroid);
                this.addAsteroidListener(socket);
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
