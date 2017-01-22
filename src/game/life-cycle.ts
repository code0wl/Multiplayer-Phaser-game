export class GameLifeCycle {
    public preload(context) {
        context.load.image('player', 'assets/ship1.png');
        context.load.image('background', 'assets/background.jpg');
    }

    public create(context) {
        context.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'background');
    }

    public update() {
        console.log('updating')
    }
}