import { GameIAGLModel, RomIAGLModel, SystemIAGLModel } from '../models/ui/basic_models';
import { GameItemType, GameMenuItem } from '../models/ui/game-item';

export function convertSystemToViewable(system: SystemIAGLModel): GameMenuItem {
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
        renderUrl: system.myOwnUrl
    };
    return gameItem;
}

export function convertGameToViewable(game: GameIAGLModel): GameMenuItem {
    let gameUI: GameMenuItem = {
        active: false,
        isHashBorder: true,
        name: game.name,
        nextRedirect: "/viewgame",
        type: GameItemType.GAME,
        thumbnailUrl: game.media.thumbnail,
        countDetail: game.romsCount + " Roms",
        description: game.category,
        prevRedirect: "/system",
        nextItems: [],
        renderUrl: game.myOwnUrl
    }
    return gameUI;
}

export function convertRomToViewable(rom: RomIAGLModel): GameMenuItem {
    let gameUI: GameMenuItem = {
        active: false,
        isHashBorder: true,
        name: rom.name,
        nextRedirect: rom.downloadUrl,
        type: GameItemType.ROM,
        thumbnailUrl: rom.media.thumbnail,
        countDetail: rom.downloadSize + " MB",
        description: rom.description,
        prevRedirect: "/",
        nextItems: [],
        renderUrl: "rom"
    }
    return gameUI;
}

export function getItemFromLocalStorage(lcStoreEnum: GameItemType): string {
    return localStorage.getItem(lcStoreEnum + "lcStorage");
}

export function saveItemToLocalStorage(lcStoreEnum: GameItemType, renderUrl: string) {
    localStorage.setItem(lcStoreEnum + "lcStorage", renderUrl);
}
