import { Socket } from "socket.io";

export interface Comet {
    id: string;
}

export interface SpaceShip {
    name: string;
    id: string;
    x: number;
    y: number;
    ammo: number;
}

export interface Coordinates {
    x: number;
    y: number;
}

interface playerActions {
    r: number;
    a: number;
    f: boolean;
    m: boolean;
}

export interface Player {
    id: string;
    uuid?: string;
    ammo: number;
    name: string;
    x: number;
    y: number;
    player?: Player;
    coors?: Coordinates & playerActions;
}

export interface Window {
    socket: SocketIOClient.Emitter;
    location: {
        reload(forceReload: boolean): void;
    };
    innerHeight: number;
    innerWidth: number;
}

export interface DomainSocket extends Socket {
    comet: {
        id: string;
    };
    player: Player;
}

export type PlayerTypes = "shooter-sprite-enemy" | "shooter-sprite";
