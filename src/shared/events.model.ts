export class GameEvent {
    public static authentication: string = 'authentication:successful';
    public static end: 'game:over';
    public static start: 'game:start';
    public static drop: string = 'drop';
}

export class CometEvent {
    public static create: string = 'comet:create';
    public static destroy: string = 'comet:destroy';
    public static hit: string = 'comet:hit';
    public static coordinates: string = 'comet:coordinates';
}

export class ServerEvent {
    public static connected: string = 'connection';
    public static disconnected: string = 'disconnect';
}

export class PlayerEvent {
    public static joined: string = 'player:joined';
    public static protagonist: string = 'player:protagonist';
    public static players: string = 'actors:collection';
    public static quit: string = 'player:left';
    public static pickup: string = 'player:pickup';
    public static hit: string = 'player:hit';
    public static coordinates: string = 'player:coordinates';
}
