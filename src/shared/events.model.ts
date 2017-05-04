export class Broadcast {
    public joined: string = 'player:joined';
    public quit: string = 'player:left';
    public gameEnd: 'game:over';
    public gameStart: 'game:start';
    public gameError: 'game:error';
}

export class Receive {
    public joined: string = 'player:joined';
    public quit: string = 'player:left';
}
