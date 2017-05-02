const app = require('express')(); // new express instance
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendfile(`./index.html`);
});

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
        io.emit('remove', socket.player.id);
    });
});

function handleMovement(location) {
    io.emit('player:location', location);
}

function getAllPlayers() {
    const playerCollection = [];
    Object.keys(io.sockets.connected).forEach((socketID) => {
        let player = io.sockets.connected[socketID].player;
        if (player) {
            playerCollection.push(player);
        }
    });
    return playerCollection;
}

http.listen(3000, () => {
    console.log('listening on localhost:3000');
});
