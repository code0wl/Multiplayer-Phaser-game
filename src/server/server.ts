import {GameEvent, PlayerEvent, ServerEvent} from "./../shared/events.model";
import {Player} from "../client/actors/player/player.class";
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

    private server: any = {};

    constructor() {
        this.socketEvents();
    }

    public connect(port) {
        http.listen(port, () => {
            console.info(`Listening on port ${port}`);
        });
    }

    private socketEvents() {
        io.on(ServerEvent.connected, socket => {
            this.attachListeners(socket)
        });
    }

    private attachListeners(socket) {
        this.addSignOnListener(socket);
        this.addMovementListener(socket);
        this.addSignOutListener(socket);
        this.addHitListener(socket);
    }

    private addHitListener(socket) {
        socket.on(PlayerEvent.hit, (playerId) => {
            socket.broadcast.emit(PlayerEvent.hit, playerId);
        });
    }

    private addMovementListener(socket) {
        socket.on(PlayerEvent.coordinates, (coors) => {
            socket.broadcast.emit(PlayerEvent.coordinates, {coors: coors, player: socket.player});
        });
    }

    private addSignOutListener(socket): void {
        socket.on(ServerEvent.disconnected, () => {
            if (socket.player) {
                socket.broadcast.emit(PlayerEvent.quit, socket.player.id);
                console.info("Total number of players:", this.players);
            }
        });
    }

    private addSignOnListener(socket): void {
        socket.on(GameEvent.authentication, (player) => {
            socket.emit(PlayerEvent.players, this.getAllPlayers());
            this.createPlayer(socket, player);
            socket.emit(PlayerEvent.protagonist, socket.player);
            socket.broadcast.emit(PlayerEvent.joined, socket.player);
            console.info("Total number of players:", this.players);
        });
    }

    private createPlayer(socket, player): void {
        socket.player = {
            name: player.name,
            id: uuid(),
            x: this.randomInt(100, 400),
            y: this.randomInt(100, 400)
        };
    }

    private get players(): number {
        return Object.keys(io.sockets.connected).length;
    }

    private getAllPlayers(): Array<Player> {
        const players = [];
        Object.keys(io.sockets.connected).map((socketID) => {
            const player = io.sockets.connected[socketID].player;
            if (player) {
                players.push(player);
            }
        });
        return players;
    }

    private randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
}

const gameSession = new GameServer();

gameSession.connect(3000);
