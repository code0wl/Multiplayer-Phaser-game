"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_model_1 = require("./../shared/events.model");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuid = require('uuid');
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendfile("./index.html");
});
var GameServer = /** @class */ (function () {
    function GameServer() {
        this.gameHasStarted = false;
        this.hasComet = false;
        this.socketEvents();
    }
    GameServer.prototype.connect = function (port) {
        http.listen(port, function () {
            console.info("Listening on port " + port);
        });
    };
    GameServer.prototype.socketEvents = function () {
        var _this = this;
        io.on(events_model_1.ServerEvent.connected, function (socket) {
            _this.attachListeners(socket);
        });
    };
    GameServer.prototype.attachListeners = function (socket) {
        this.addSignOnListener(socket);
        this.addMovementListener(socket);
        this.addSignOutListener(socket);
        this.addHitListener(socket);
        this.addCometHitListener(socket);
        this.addPickupListener(socket);
    };
    GameServer.prototype.addHitListener = function (socket) {
        socket.on(events_model_1.PlayerEvent.hit, function (playerId) {
            socket.broadcast.emit(events_model_1.PlayerEvent.hit, playerId);
        });
    };
    GameServer.prototype.updateComet = function (socket) {
        var _this = this;
        if (this.hasComet) {
            var asteroidCoordinates_1 = this.generateRandomCoordinates();
            asteroidCoordinates_1.y = -128;
            var update_1 = setInterval(function () {
                asteroidCoordinates_1.y += 1;
                asteroidCoordinates_1.x -= 1;
                socket.emit(events_model_1.CometEvent.coordinates, asteroidCoordinates_1);
                socket.broadcast.emit(events_model_1.CometEvent.coordinates, asteroidCoordinates_1);
                _this.destroyComet(asteroidCoordinates_1, socket, update_1);
            }, 25);
        }
    };
    GameServer.prototype.destroyComet = function (asteroidCoordinates, socket, update) {
        if (asteroidCoordinates.x < -128) {
            socket.emit(events_model_1.CometEvent.destroy);
            socket.broadcast.emit(events_model_1.CometEvent.destroy);
            this.hasComet = false;
            global.clearInterval(update);
        }
    };
    GameServer.prototype.addCometHitListener = function (socket) {
        socket.on(events_model_1.CometEvent.hit, function (playerId) {
            socket.broadcast.emit(events_model_1.CometEvent.hit, playerId);
        });
    };
    GameServer.prototype.gameInitialised = function (socket) {
        if (!this.gameHasStarted) {
            this.gameHasStarted = true;
            this.createComet(socket, 1000);
            this.calcPickupCoordinates(socket, 5000);
        }
    };
    GameServer.prototype.calcPickupCoordinates = function (socket, interval) {
        var _this = this;
        setInterval(function () {
            var coordinates = _this.generateRandomCoordinates();
            socket.emit(events_model_1.GameEvent.drop, coordinates);
            socket.broadcast.emit(events_model_1.GameEvent.drop, coordinates);
        }, interval);
    };
    GameServer.prototype.createComet = function (socket, interval) {
        var _this = this;
        setInterval(function () {
            if (!_this.hasComet) {
                socket.comet = {
                    id: uuid()
                };
                _this.hasComet = true;
                socket.emit(events_model_1.CometEvent.create, socket.comet);
                socket.broadcast.emit(events_model_1.CometEvent.create, socket.comet);
                _this.updateComet(socket);
            }
        }, interval);
    };
    GameServer.prototype.addPickupListener = function (socket) {
        socket.on(events_model_1.PlayerEvent.pickup, function (player) {
            socket.player.ammo = player.ammo;
            socket.broadcast.emit(events_model_1.PlayerEvent.pickup, player.uuid);
        });
    };
    GameServer.prototype.addMovementListener = function (socket) {
        socket.on(events_model_1.PlayerEvent.coordinates, function (coors) {
            socket.broadcast.emit(events_model_1.PlayerEvent.coordinates, {
                coors: coors,
                player: socket.player
            });
        });
    };
    GameServer.prototype.addSignOutListener = function (socket) {
        socket.on(events_model_1.ServerEvent.disconnected, function () {
            if (socket.player) {
                socket.broadcast.emit(events_model_1.PlayerEvent.quit, socket.player.id);
            }
        });
    };
    GameServer.prototype.addSignOnListener = function (socket) {
        var _this = this;
        socket.on(events_model_1.GameEvent.authentication, function (player, gameSize) {
            socket.emit(events_model_1.PlayerEvent.players, _this.getAllPlayers());
            _this.createPlayer(socket, player, gameSize);
            socket.emit(events_model_1.PlayerEvent.protagonist, socket.player);
            socket.broadcast.emit(events_model_1.PlayerEvent.joined, socket.player);
            _this.gameInitialised(socket);
        });
    };
    GameServer.prototype.createPlayer = function (socket, player, windowSize) {
        socket.player = {
            name: player.name,
            id: uuid(),
            ammo: 0,
            x: this.randomInt(0, windowSize.x),
            y: this.randomInt(0, windowSize.y)
        };
    };
    Object.defineProperty(GameServer.prototype, "players", {
        get: function () {
            return Object.keys(io.sockets.connected).length;
        },
        enumerable: true,
        configurable: true
    });
    GameServer.prototype.getAllPlayers = function () {
        var players = [];
        Object.keys(io.sockets.connected).map(function (socketID) {
            var player = io.sockets.connected[socketID].player;
            if (player) {
                players.push(player);
            }
        });
        return players;
    };
    GameServer.prototype.generateRandomCoordinates = function () {
        return {
            x: Math.floor(Math.random() * 1024) + 1,
            y: Math.floor(Math.random() * 768) + 1
        };
    };
    GameServer.prototype.randomInt = function (low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    };
    return GameServer;
}());
var gameSession = new GameServer();
gameSession.connect(3000);
//# sourceMappingURL=server.js.map