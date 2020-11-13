import { GameIAGLModel, RomIAGLModel } from "../models/basic_models";
import { resolveGameBoxArt } from "../utils/boxart_utils";
import { getCateg } from "../utils/iagl_helper_utils";
import { GameElement, ROMElement } from "../utils/iagl_system_parser_roms";
import { processAllRoms } from "./roms_service";

export async function processAllGames(gamelist: GameElement[], base_url: string) {
    let processedGamesList: GameIAGLModel[] = [];
    for (let game of gamelist) {
        let processedGame = await convertGameData(game, base_url);
        if (processedGame) {
            console.log("Game processed: " + processedGame.name);
            processedGamesList.push(processedGame);
        }
    }
    return processedGamesList;
}

async function convertGameData(gameToConvert: GameElement, base_url: string) {
    try {
        let romList: ROMElement[];
        if (gameToConvert.rom instanceof Array) {
            romList = gameToConvert.rom;
        } else {
            romList = [gameToConvert.rom];
        }
        let boxart = await resolveGameBoxArt(gameToConvert.giantbomb_url?._text,
            gameToConvert.thegamesdb_id?._text, gameToConvert.mobygames_url?._text,
            gameToConvert._attributes.name);
        let processedRomsList: RomIAGLModel[] = processAllRoms(romList, base_url, boxart);
        let returnGame: GameIAGLModel = {
            name: gameToConvert.title_clean?._text ?
                gameToConvert.title_clean?._text : gameToConvert._attributes.name,
            category: getCateg(gameToConvert),
            description: gameToConvert.plot?._text + '',
            media: {
                thumbnail: boxart
            },
            romsCount: processedRomsList.length,
            romsList: processedRomsList
        }
        return returnGame;
    } catch (error) {
        return undefined;
    }

}


