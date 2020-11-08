export interface GameMenuItem {
    name: string;
    url: string;
    type: GameItemType;
    active: boolean;
    isHashBorder: boolean;
}

export enum GameItemType {
    GAME="game",
    SUBMENU="submenu"
}