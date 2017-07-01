export class Hud {

    // will be used to display visually the current state of the ammo count
    private ammo: Phaser.Text;

    // we will add a feature where the user will be able to add her name
    private name: string;

    // since we are in outer space, we need readale text. here we are
    // declaring a type of font and the color it will have
    private style: { font, fill };

    constructor() {
        // declare the style to be used in the name and ammo text
        this.style = {
            font: '10px Arial',
            fill: '#ffffff'
        }
    }

    // Once the user has entered their name. We can grab that value and add
    // the text to the player they have just created
    public setName(game, player): void {
        this.name = game.add.text(0, 10, player.name.substring(0, 6), this.style);
        player.addChild(this.name);
    }

    // the update method will be used as a hook that will keep rendering the
    // initial ammo count
    public update(ammo): void {
        this.ammo.setText(`${ammo ? ammo : ''}`);
    }

    // an api is handy if we want to assign ammo to a weapon and a player.
    // We shall be making use of this method when the user picks up the
    // projectile
    public setAmmo(game, player, weapon): void {
        if (this.ammo) {
            this.ammo.setText('');
        }
        this.ammo = game.add.text(0, 25, weapon.bulletCount, this.style);
        player.addChild(this.ammo);
    }
}