import { GameIAGLModel, SystemIAGLModel } from './../iagl/base_model';
import { GameItemType, GameMenuItem } from './game-item';

export function convertSystemToViewable(system: SystemIAGLModel): GameMenuItem {
    let gameItem: GameMenuItem = {
        name: system.name,
        url: system.media.thumbnail,
        type: GameItemType.SUBMENU,
        active: false,
        isHashBorder: true,
        countDetail: system.gamesCount + " Games",
        description: system.description,
        next: '/system',
        cache: { gameListCache: system.cache },
        nextItems: [],
        prev: "/"
    };
    return gameItem;
}

export function convertGameToViewable(game: GameIAGLModel): GameMenuItem {
    let gameUI: GameMenuItem = {
        active: false,
        isHashBorder: true,
        name: game.name,
        next: "/viewgame",
        type: GameItemType.GAME,
        url: game.media.thumbnail,
        countDetail: game.gameSize + "MB",
        description: game.category,
        cache: { giantBombUrl: game.cacheImgUrl },
        prev: "/viewSystem",
        nextItems: []
    }
    return gameUI;
}

export function getItemFromLocalStorage(lcStoreEnum: GameItemType | string): GameMenuItem {
    let lcSys = localStorage.getItem(lcStoreEnum + "lcStorage")
    if (lcSys) {
        return JSON.parse(lcSys);
    } else {
        return undefined;
    }
}

export function saveItemToLocalStorage(lcStoreEnum: GameItemType | string, lcSys: GameMenuItem) {
    localStorage.setItem(lcStoreEnum + "lcStorage", JSON.stringify(lcSys));
}
