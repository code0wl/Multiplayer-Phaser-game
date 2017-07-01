export class Player {
    public player: Phaser.Sprite;
    public controls: KeyBoardControl;
    public playerState: Map<string, boolean | number>;
    public angularVelocity: number = 300;

    constructor(private gameInstance: Phaser.Game,
                public playerInstance: any) {
        this.createPlayer(this.gameInstance);
        this.playerInstance = playerInstance;
        this.playerState = new Map();
    }

    public createPlayer(gameInstance): void {
        this.addControls();

        this.player = gameInstance.add.sprite(
            100, 100, 'shooter-sprite'
        );
        this.player.anchor.setTo(0.5, 0.5);
        this.attachPhysics(gameInstance);
    }

    public assignPickup(): void {

    }

    public view(): void {

    }

    private addControls(): void {

    }

    private attachPhysics(gameInstance): void {
        gameInstance.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.setTo(10, 10);
        this.player.body.gravity.y = 0;
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.immovable = false;
    }

}

