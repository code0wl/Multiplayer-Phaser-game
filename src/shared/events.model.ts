export class Broadcast {
    public static joined: string = 'player:joined';
    public static quit: string = 'player:left';
    public static gameEnd: 'game:over';
    public static gameStart: 'game:start';
    public static authentication: string = 'authentication:successful';
    public static gameError: 'game:error';
    public static created: string = 'player:created';
    public static players: string = 'players:collection';
    public static coordinates: string = 'player:coordinates';
}

export class Receive {
    public static joined: string = 'player:joined';
    public static created: string = 'player:created';
    public static players: string = 'players:collection';
    public static authentication: string = 'authentication:successful';
    public static quit: string = 'player:left';
    public static coordinates: string = 'player:coordinates';
}
