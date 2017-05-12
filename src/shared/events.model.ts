export class GameEvent {
    public static authentication: string = 'authentication:successful';
    public static end: 'game:over';
    public static start: 'game:start';
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
    public static coordinates: string = 'player:coordinates';
}
