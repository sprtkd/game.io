export interface GameMenuItem {
    name: string;
    renderUrl: string;
    thumbnailUrl: string;
    type: GameItemType;
    active: boolean;
    isHashBorder: boolean;
    description?: string;
    countDetail: string;
    prevRedirect: string;
    nextRedirect: string;
    nextItems: GameMenuItem[];
}

export enum GameItemType {
    GAME = "game",
    CONSOLE = "console",
    INTERNAL = "internal",
    MASTER = "master",
    ROM = "rom",
    LAST_SYSTEM = "last_system"
}