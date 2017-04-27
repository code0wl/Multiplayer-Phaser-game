const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendfile(`./src/scenes/login.html`);
});

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
