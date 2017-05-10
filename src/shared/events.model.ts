export class GameEvent {
    public static authentication: string = 'authentication:successful';
    public static gameEnd: 'game:over';
    public static gameStart: 'game:start';
    public static gameError: 'game:error';
}

export class ServerEvent {
    public static connected: string = 'connection';
    public static disconnected: string = 'disconnect';
}

export class PlayerEvent {
    public static joined: string = 'player:joined';
    public static players: string = 'players:collection';
    public static quit: string = 'player:left';
    public static coordinates: string = 'player:coordinates';
}
