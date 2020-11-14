import { getXmlData } from "../api/github_call";
import { GameIAGLModel, SystemIAGLModel } from "../models/basic_models";
import { xmlToJson } from "../utils/iagl_helper_utils";
import { ConvertIaglSystem, GameElement, IAGLSystem } from "../utils/iagl_system_parser_roms";
import { writeSystemToJson } from "../writer/json_write";
import { getSystemArt } from "./../utils/boxart_utils";
import { processAllGames } from "./games_service";

export async function processSystemData(url: string) {
    try {
        await convertAndSaveSystemData(xmlToJson(await getXmlData(url)));
    } catch (error) {
        console.error("Error while processing system: " + url);
    }
}

export async function convertAndSaveSystemData(jsonStr: string) {
    let iAGLSystemJustParsed: IAGLSystem = ConvertIaglSystem(jsonStr);
    let games: GameElement[];
    if (iAGLSystemJustParsed.datafile.game instanceof Array) {
        games = iAGLSystemJustParsed.datafile.game;
    } else {
        games = [iAGLSystemJustParsed.datafile.game];
    }
    let baseurl = iAGLSystemJustParsed.datafile.header.emu_baseurl._text ?
        iAGLSystemJustParsed.datafile.header.emu_baseurl._text :
        "https://archive.org/download/";
    let systemIAGLModel: SystemIAGLModel = {
        name: iAGLSystemJustParsed.datafile.header.emu_name._text + '',
        category: iAGLSystemJustParsed.datafile.header.emu_category._text + '',
        description: iAGLSystemJustParsed.datafile.header.emu_description._text
            + ': ' + iAGLSystemJustParsed.datafile.header.emu_category._text,
        gamesCount: 0,
        gameslist: [],
        media: {
            thumbnail: await getSystemArt(iAGLSystemJustParsed.datafile.header.emu_description._text)
        }
    }
    let syspath = writeSystemToJson(systemIAGLModel);
    console.log("System processed: Name: " + systemIAGLModel.name);
    await processAllGames(games, baseurl, syspath);
}


