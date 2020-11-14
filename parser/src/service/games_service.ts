import { GameIAGLModel, RomIAGLModel } from "../models/basic_models";
import { resolveGameBoxArt } from "../utils/boxart_utils";
import { gamePlot, getCateg } from "../utils/iagl_helper_utils";
import { GameElement, ROMElement } from "../utils/iagl_system_parser_roms";
import { writeGameToFile } from "../writer/json_write";
import { processAllRoms } from "./roms_service";

export async function processAllGames(gamelist: GameElement[], base_url: string, sys_path: string) {
    for (let game of gamelist) {
        await convertGameData(game, base_url, sys_path);
    }
}

async function convertGameData(gameToConvert: GameElement, base_url: string, sys_path: string) {
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
            description: gamePlot(gameToConvert.plot?._text),
            media: {
                thumbnail: boxart
            },
            romsCount: processedRomsList.length,
            romsList: processedRomsList
        }
        writeGameToFile(returnGame, sys_path);
        console.log("Game processed: " + returnGame.name);
    } catch (error) {
        console.log("Game process error: " + error);
        return;
    }

}


