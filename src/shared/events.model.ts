export class GameEvent {
    public static readonly authentication: string = "authentication:successful";
    public static readonly end: "game:over";
    public static readonly start: "game:start";
    public static readonly drop: string = "drop";
}

export class CometEvent {
    public static readonly create: string = "comet:create";
    public static readonly destroy: string = "comet:destroy";
    public static readonly hit: string = "comet:hit";
    public static readonly coordinates: string = "comet:coordinates";
}

export class ServerEvent {
    public static readonly connected: string = "connection";
    public static readonly disconnected: string = "disconnect";
}

export class PlayerEvent {
    public static readonly joined: string = "player:joined";
    public static readonly protagonist: string = "player:protagonist";
    public static readonly players: string = "actors:collection";
    public static readonly quit: string = "player:left";
    public static readonly pickup: string = "player:pickup";
    public static readonly hit: string = "player:hit";
    public static readonly coordinates: string = "player:coordinates";
}
