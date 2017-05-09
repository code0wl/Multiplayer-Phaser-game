import {Broadcast, Receive} from "./../shared/events.model";
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

    private handleMovement(location) {
        io.emit('player:location', location);
    }

    private socketEvents() {
        io.on('connection', socket => {
            socket.on(Receive.authentication, (player) => {
                socket.player = {
                    id: uuid(),
                    x: this.randomInt(100, 400),
                    y: this.randomInt(100, 400)
                };
                socket.emit(Broadcast.players, this.getAllPlayers());
                socket.broadcast.emit(Broadcast.joined, socket.player);
            });

            socket.on('player:coordinates', this.handleMovement);

            socket.on('disconnect', () => {
                socket.emit(Broadcast.quit, socket.player.id);
            });
        });
    }

    private getAllPlayers() {
        console.log('called');
        const players = [];
        Object.keys(io.sockets.connected).map((socketID) => {
            let player = io.sockets.connected[socketID].player;
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