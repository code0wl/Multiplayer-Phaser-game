const app = require('express')(); // new express instance
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendfile(`./index.html`);
});

io.on('connection', socket => {
    console.log('user connection');

    socket.on('authentication:successful', msg => {
        socket.emit('add:player');
    });

    socket.on('player:coordinates', msg => {
        console.log('mssage', msg)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
