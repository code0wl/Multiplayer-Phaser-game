import {Player} from "../client/actors/player/player.class";
const app = require('express')(); // new express instance
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendfile(`./index.html`);
});

class GameServer {

    playerCollection: Array<Player>

    constructor() {
        this.attachEvents();
        this.playerCollection = [];
    }

    public connect(port) {
        http.listen(port, () => {
           
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

    private attachEvents() {
        io.on('connection', socket => {
            socket.on('authentication:successful', msg => {
                io.emit('player:add');
            });

            socket.on('player:created', (player) => {
                socket.player = {
                    id: player.id,
                    x: player.x,
                    y: player.y
                };
                socket.emit('allplayers', getAllPlayers());
                socket.broadcast.emit('newplayer', socket.player);
            });

            socket.on('player:coordinates', handleMovement);

            socket.on('disconnect', () => {
                if (socket.player) {
                    io.emit('remove', socket.player.id);
                }
            });
        });
    }
}

const gameSession = new GameServer();

gameSession.connect();
