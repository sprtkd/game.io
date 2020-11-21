import { GameIAGLModel, SystemIAGLModel } from '../models/ui/basic_models';
import { GameItemType, GameMenuItem } from '../models/ui/game-item';

export function convertSystemToViewable(system: SystemIAGLModel, renderUrlStr: string): GameMenuItem {
    let gameItem: GameMenuItem = {
        name: system.name,
        type: GameItemType.CONSOLE,
        active: false,
        isHashBorder: true,
        countDetail: system.gamesCount + " Games",
        description: system.description,
        nextRedirect: '/system',
        prevRedirect: "/",
        nextItems: [],
        thumbnailUrl: system.media.thumbnail,
        renderUrl: renderUrlStr
    };
    return gameItem;
}

export function convertGameToViewable(game: GameIAGLModel, renderUrlStr: string): GameMenuItem {
    let gameUI: GameMenuItem = {
        active: false,
        isHashBorder: true,
        name: game.name,
        nextRedirect: "/viewgame",
        type: GameItemType.GAME,
        thumbnailUrl: game.media.thumbnail,
        countDetail: game.romsCount + "Roms",
        description: game.category,
        prevRedirect: "/system",
        nextItems: [],
        renderUrl: renderUrlStr
    }
    return gameUI;
}

export function getItemFromLocalStorage(lcStoreEnum: GameItemType): string {
    return localStorage.getItem(lcStoreEnum + "lcStorage");
}

export function saveItemToLocalStorage(lcStoreEnum: GameItemType, renderUrl: string) {
    localStorage.setItem(lcStoreEnum + "lcStorage", renderUrl);
}
