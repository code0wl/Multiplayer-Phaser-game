const app = require('express')(); // new express instance
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);

let players = 0;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendfile(`./index.html`);
});

io.on('connection', socket => {

    socket.on('authentication:successful', msg => {
        io.emit('player:add');
    });

    socket.on('player:coordinates', location => {
        io.emit('player:location', location);
    });

    socket.on('player:created', () => {
        players++;
        console.log('Total players on server: ' + players);
    })

});

http.listen(3000, () => {
    console.log('listening on localhost:3000');
});
