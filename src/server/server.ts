import { GameEvent, PlayerEvent, ServerEvent } from "./../shared/events.model";
import { SpaceShip } from "../shared/model";
import Socket = SocketIO.Socket;
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const uuid = require("uuid");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendfile(`./index.html`);
});

class GameServer {
    // A simple boolean to detect if the game has been already started
    private dirtyFlag: boolean = false;

    constructor() {
        this.socketEvents();
    }

    public connect(port) {
        http.listen(port, () => {
            console.info(`Listening on port ${port}`);
        });
    }

    private socketEvents() {
        io.on(ServerEvent.connected, socket => {
            this.attachListeners(socket);
        });
    }

    private attachListeners(socket) {
        this.addSignOnListener(socket);
        this.addMovementListener(socket);
        this.addSignOutListener(socket);
        this.addHitListener(socket);
        this.addPickupListener(socket);
    }

    private addHitListener(socket) {
        // If the player has been hit, we a player hit event including the
        // player id, notifying the others that this specific player has
        // been struck
        socket.on(PlayerEvent.hit, playerId => {
            socket.broadcast.emit(PlayerEvent.hit, playerId);
        });
    }

    private gameInitialised(socket): void {
        // initialise the game if the first user logs in
        if (!this.dirtyFlag) {
            this.dirtyFlag = true;

            // Generate pickup loot on every 10 seconds so the players can
            // replenish their ammo
            setInterval(() => {
                const coordinates = {
                    x: Math.floor(Math.random() * 1024) + 1,
                    y: Math.floor(Math.random() * 768) + 1
                };
                socket.emit(GameEvent.drop, coordinates);
                socket.broadcast.emit(GameEvent.drop, coordinates);
            }, 10000);
        }
    }

    private addPickupListener(socket) {
        // If the player picks up an item. Emit the pickup event to notify
        // the frontend
        socket.on(PlayerEvent.pickup, player => {
            socket.player.ammo = player.ammo;
            socket.broadcast.emit(PlayerEvent.pickup, player.uuid);
        });
    }

    private addMovementListener(socket) {
        // Keep track of the player positions
        socket.on(PlayerEvent.coordinates, coors => {
            socket.broadcast.emit(PlayerEvent.coordinates, {
                coors: coors,
                player: socket.player
            });
        });
    }

    private addSignOutListener(socket): void {
        // Detect if a player has died or has quit the session
        socket.on(ServerEvent.disconnected, () => {
            if (socket.player) {
                socket.broadcast.emit(PlayerEvent.quit, socket.player.id);
            }
        });
    }

    private addSignOnListener(socket): void {
        // Detect if a player has joined the session
        socket.on(GameEvent.authentication, (player, gameSize) => {
            socket.emit(PlayerEvent.players, this.getAllPlayers());
            this.createPlayer(socket, player, gameSize);
            socket.emit(PlayerEvent.protagonist, socket.player);
            socket.broadcast.emit(PlayerEvent.joined, socket.player);
            this.gameInitialised(socket);
        });
    }

    private createPlayer(
        socket,
        player: SpaceShip,
        windowSize: { x; y }
    ): void {
        // here is where the magic happens. We create a new player and add
        // the following properties to her
        socket.player = {
            name: player.name,
            id: uuid(),
            ammo: 0,
            x: this.randomInt(0, windowSize.x),
            y: this.randomInt(0, windowSize.y)
        };
    }

    private get players(): number {
        // a method for collecting the total player length
        return Object.keys(io.sockets.connected).length;
    }

    private getAllPlayers(): Array<SpaceShip> {
        // We need a way to notify all of the players. Using this method we
        // can always get all of the current players logged into our session
        const players = [];
        Object.keys(io.sockets.connected).map(socketID => {
            const player = io.sockets.connected[socketID].player;
            if (player) {
                players.push(player);
            }
        });
        return players;
    }

    private randomInt(low, high) {
        // for generating random coordinates, we shall be using this one a
        // lot as we are generating both random coordinates for our players
        // and our loot
        return Math.floor(Math.random() * (high - low) + low);
    }
}

const gameSession = new GameServer();

gameSession.connect(3000);
