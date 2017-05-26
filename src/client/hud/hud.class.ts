export class Hud {

    private ammo: Phaser.Text;
    private name: string;
    private style: { font, fill };

    constructor() {
        this.style = {
            font: '10px Arial',
            fill: '#ffffff'
        }
    }

    public setName(game, player): void {
        this.name = game.add.text(0, 10, player.name.substring(0, 6), this.style);
        player.addChild(this.name);
    }

    public update(ammo): void {
        this.ammo.setText(`${ammo ? ammo : ''}`);
    }

    public setAmmo(game, player, weapon): void {
        if (this.ammo) {
            this.ammo.setText('');
        }
        this.ammo = game.add.text(0, 25, weapon.bulletCount, this.style);
        player.addChild(this.ammo);
    }
}