// our spaceship model
export interface SpaceShip {
    // we need a name
    name: string;

    // a way of identifying our vessel
    id: string;

    // x and y coordinates we shall be receiving from the backend
    x: number;
    y: number;

    // the current amount of ammo the player has
    ammo: number;
}
