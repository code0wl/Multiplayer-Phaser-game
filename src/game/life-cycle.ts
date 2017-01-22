export const GameLifeCycle = {
    preload(context) {
        context.load.image('player', 'assets/ship1.png');
        context.load.image('background', 'assets/background.jpg');
    },

    create(context) {
        context.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'background');
    },

    update() {
        console.log('update called')
    }
}
