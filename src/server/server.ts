import {Broadcast, Receive} from "./../shared/events.model";
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendfile(`./index.html`);
});

class GameServer {

    constructor() {
        this.socketEvents();
        this.renderAllPlayers = this.renderAllPlayers.bind(this);
    }

    public connect(port) {
        http.listen(port, () => {
            console.info(`Listening on port ${port}`);
        });
    }

    private handleMovement(location) {
        io.emit('player:location', location);
    }

    private renderAllPlayers(socket): void {
        const playerCollection = [];
        Object.keys(io.sockets.connected).forEach((socketID) => {
            let player = io.sockets.connected[socketID].player;
            if (player) {
                playerCollection.push(player);
                socket.emit(Broadcast.joined, player);
            }
        });
    }

    private socketEvents() {
        io.on('connection', socket => {

            socket.on(Receive.authentication, () => {
                socket.emit(Broadcast.joined);
            });

            socket.on(Receive.joined, (player) => {
                socket.player = player;
                socket.emit(Broadcast.players, this.renderAllPlayers(socket));
            });

            socket.on('player:coordinates', this.handleMovement);

            socket.on('disconnect', () => {
                if (socket.player) {
                    socket.emit('remove', socket.player.id);
                }
            });
        });
    }
}

const gameSession = new GameServer();

gameSession.connect(3000);