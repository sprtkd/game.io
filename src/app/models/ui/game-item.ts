export interface GameMenuItem {
    name: string;
    url: string;
    type: GameItemType;
    active: boolean;
    isHashBorder: boolean;
    description?: string;
    countDetail?: string;
}

export enum GameItemType {
    GAME = "game",
    SUBMENU = "submenu",
    SYSTEM = "system"
}