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

            socket.on(Receive.authentication, () => {
                socket.emit(Broadcast.joined);
            });

            socket.on(Receive.created, (player) => {
                const playerCollection = [];
                socket.player = player;
                playerCollection.push(player);
                playerCollection.map((player) => {
                    console.log(player);
                    socket.broadcast.emit(Broadcast.joined, socket.player);
                });
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