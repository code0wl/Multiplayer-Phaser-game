export class GameEvent {
    public static authentication: string = 'authentication:successful';
    public static gameEnd: 'game:over';
}

export class ServerEvent {
    public static connected: string = 'connection';
    public static disconnected: string = 'disconnect';
}

export class PlayerEvent {
    public static joined: string = 'player:joined';
    public static mainActorJoined: string = 'main:joined';
    public static players: string = 'players:collection';
    public static quit: string = 'player:left';
    public static coordinates: string = 'player:coordinates';
}
