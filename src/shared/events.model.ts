export class Broadcast {
    public static joined: string = 'player:joined';
    public static quit: string = 'player:left';
    public static gameEnd: 'game:over';
    public static gameStart: 'game:start';
    public static authentication: string = 'authentication:successful';
    public static gameError: 'game:error';
}

export class Receive {
    public static joined: string = 'player:joined';
    public static authentication: string = 'authentication:successful';
    public static quit: string = 'player:left';
}
