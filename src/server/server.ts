const app = require('express')(); // new express instance
const express = require('express');
const http = require('http').Server(app);
require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendfile(`./index.html`);
});

http.listen(3000, () => {
    console.info('listening on localhost:3000');
});