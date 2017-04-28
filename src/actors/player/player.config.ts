import {PlayerModel} from "./player.model";

export const playerOptions: PlayerModel = {
    health: 100,
    name: window.localStorage.getItem('name')
};