import {Broadcast, Receive} from "./../shared/events.model";
import {Player} from "../client/actors/player/player.class";
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendfile(`./index.html`);
});

class GameServer {

    private playerCollection: Array<Player>;

    constructor() {
        this.attachEvents();
        this.playerCollection = [];
    }

    public connect(port) {
        http.listen(port, () => {
            console.info(`Listening on port ${port}`);
        });
    }

    private handleMovement(location) {
        io.emit('player:location', location);
    }

    private getAllPlayers() {
        Object.keys(io.sockets.connected).forEach((socketID) => {
            let player = io.sockets.connected[socketID].player;
            if (player) {
                this.playerCollection.push(player);
            }
        });
        return this.playerCollection;
    }

    private randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    private attachEvents() {
        io.on('connection', socket => {

            socket.on(Receive.authentication, (msg) => {
                socket.emit(Broadcast.joined);
            });

            socket.on(Receive.created, (player) => {
                socket.emit('allplayers', this.getAllPlayers());
            });

            socket.on('player:coordinates', this.handleMovement);

            socket.on('disconnect', () => {
                if (socket.player) {
                    io.emit('remove', socket.player.id);
                }
            });
        });
    }
}

const gameSession = new GameServer();

gameSession.connect(3000);