const app = require('express')();
const http = require('http').Server(app);

app.get('/', function (req, res) {
    res.sendfile(`./src/scenes/login.html`);
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
