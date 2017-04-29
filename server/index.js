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

    socket.on('enemy:coordinates', location => {
        io.emit('enemy:location', location);
    });

});

http.listen(3000, () => {
    console.log('listening on localhost:3000');
});
