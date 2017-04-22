declare const Phaser: any;

export class KeyBoardControl {
    public gameControls: any = {};

    constructor(private gameInstance: any) {
        this.gameControls.cursors = this.gameInstance.input.keyboard.createCursorKeys();
        this.gameControls.fireWeapon = this.gameInstance.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    }

}