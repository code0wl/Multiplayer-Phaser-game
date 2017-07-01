// Events produced by our game
export class GameEvent {
    // When someone logs in successfully
    public static authentication: string = 'authentication:successful';

    // When the game is over
    public static end: 'game:over';

    // When the game started
    public static start: 'game:start';

    // When a pickup or powerup has entered the arena
    public static drop: string = 'drop';
}

// Events produced by the Server
export class ServerEvent {
    public static connected: string = 'connection';
    public static disconnected: string = 'disconnect';
}

// Events produced by the player
export class PlayerEvent {

    // When a enemy joins
    public static joined: string = 'player:joined';

    // When the main character joins
    public static protagonist: string = 'player:protagonist';

    // When we ping all players
    public static players: string = 'actors:collection';

    // When a player dies or leaves
    public static quit: string = 'player:left';

    // When a player picks up the loot
    public static pickup: string = 'player:pickup';

    // When one gets hit
    public static hit: string = 'player:hit';

    // When the player moves we need to update the coordinates
    public static coordinates: string = 'player:coordinates';
}
