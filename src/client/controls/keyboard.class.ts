declare const Phaser: any;

export class KeyBoardControl {
    public gameControls: any = {};
    private playerInstance: any;

    constructor(private gameInstance: any, player) {
        this.playerInstance = player;
        this.gameControls.cursors = this.gameInstance.input.keyboard.createCursorKeys();
        this.gameControls.fireWeapon = this.gameInstance.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    }

    public update(): void {
        if (this.playerInstance.player.alive) {
            this.playerInstance.playerState.set('fire', false);

            if (this.gameControls.cursors.up.isDown) {
                this.gameInstance.physics.arcade.accelerationFromRotation(this.playerInstance.player.rotation, 100, this.playerInstance.player.body.acceleration);
                this.playerInstance.player.animations.play('accelerating');
                this.playerInstance.playerState.set('moving', true);
            } else {
                this.playerInstance.player.body.acceleration.set(0);
                this.playerInstance.playerState.set('moving', false);
            }

            if (this.gameControls.cursors.left.isDown) {
                this.playerInstance.player.body.angularVelocity = -this.playerInstance.angularVelocity;
            } else if (this.playerInstance.controls.gameControls.cursors.right.isDown) {
                this.playerInstance.player.body.angularVelocity = this.playerInstance.angularVelocity;
            } else {
                this.playerInstance.player.body.angularVelocity = 0;
            }

            if (this.gameControls.fireWeapon.isDown) {
                if (this.playerInstance.projectile) {
                    this.playerInstance.projectile.fireWeapon();
                    this.playerInstance.playerState.set('fire', true);
                    this.playerInstance.playerState.set('ammo', this.playerInstance.projectile.bulletCount);
                } else {
                    this.playerInstance.playerState.set('fire', false);
                }
            }
        }
    }
}