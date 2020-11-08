import { xml2json } from "xml-js";
import { BaseGitContentModel, GameIAGLModel, IAGLMedia, SystemIAGLModel } from './base_model';
import { ConvertIaglSystem, GameElement, IAGLSystem } from "./iagl_system_parser_roms";
import { getItemFromUrl } from './prim_html_scraper';

const DEFAULT_URL_GAME = "https://cdn.pixabay.com/photo/2017/06/10/07/15/game-2389215_960_720.png";

export function xmlToJson(xmlData: string) {
    return xml2json(xmlData, { compact: true, spaces: 4 });
}
export function cleanData(datalist: BaseGitContentModel[]) {
    let ending = "_ZachMorris.xml";
    let ending2 = ".xml";
    for (let data of datalist) {
        if (data.name.endsWith(ending)) {
            data.name = data.name.substring(0, data.name.indexOf(ending));
        } else if (data.name.endsWith(ending2)) {
            data.name = data.name.substring(0, data.name.indexOf(ending2));
        }
        data.name = data.name.split('_').join(' ');
    }
}

export async function convertSystemData(jsonStr: string) {
    let iAGLSystemJustParsed: IAGLSystem;
    iAGLSystemJustParsed = ConvertIaglSystem(jsonStr);
    let gamesCount = 0;
    let games: GameElement[];
    if (iAGLSystemJustParsed.datafile.game instanceof Array) {
        gamesCount = iAGLSystemJustParsed.datafile.game.length;
        games = iAGLSystemJustParsed.datafile.game;
    } else {
        gamesCount = 1;
        games = [iAGLSystemJustParsed.datafile.game];
    }

    let systemIAGLModel: SystemIAGLModel = {
        name: iAGLSystemJustParsed.datafile.header.emu_name._text,
        basename: iAGLSystemJustParsed.datafile.header.emu_description._text,
        base_url: iAGLSystemJustParsed.datafile.header.emu_baseurl._text,
        category: iAGLSystemJustParsed.datafile.header.emu_category._text,
        description: iAGLSystemJustParsed.datafile.header.emu_description._text
            + ': ' + iAGLSystemJustParsed.datafile.header.emu_category._text,
        gamesCount: gamesCount,
        gameslist: [],
        media: {
            banner: null,
            fanart: null,
            logo: null,
            thumbnail: randomSystemUrl(),
            trailer: null
        },
        cache: games
    }
    return systemIAGLModel;
}

export async function getGiantBombArt(baseurl: string) {
    if (!baseurl) {
        return DEFAULT_URL_GAME;
    }
    let tokens = ["wiki-boxart imgboxart", 'img src="', '"/>'];
    try {
        return await getItemFromUrl(baseurl, tokens);
    } catch (error) {
        return DEFAULT_URL_GAME;
    }
}

export function convertGameData(gameToConvert: GameElement) {
    let returnGame: GameIAGLModel = {
        name: gameToConvert.title_clean?._text,
        category: gameToConvert.year?._text + " " +
            gameToConvert.studio?._text + " | " + gameToConvert.genre?._text
            + " " + gameToConvert.perspective?._text
            + " ⚡ " + gameToConvert.rating?._text,
        description: gameToConvert.plot?._text,
        download_url: gameToConvert.rom instanceof Array ?
            gameToConvert.rom[0]._attributes.name : gameToConvert.rom._attributes.name,
        gameSize: parseInt((gameToConvert.rom instanceof Array ?
            gameToConvert.rom[0]._attributes.name : gameToConvert.rom._attributes.name)),
        media: {
            banner: null,
            fanart: null,
            logo: null,
            thumbnail: DEFAULT_URL_GAME,
            trailer: null
        },
        cacheImgUrl: gameToConvert.giantbomb_url?._text
    }
    return returnGame;
}

var lastpush = 0;
function randomSystemUrl() {
    let urls = ["https://st.depositphotos.com/1734074/3308/v/950/depositphotos_33087807-stock-illustration-vector-gamepad-icon.jpg",
        "https://www.clipartkey.com/mpngs/m/26-266487_transparent-game-controller-clip-art-mlp-gaming-cutie.png",
        "https://i.pinimg.com/originals/83/9b/fd/839bfdc7c61b0590b7a4ef0bd6078d2b.jpg",
        "https://us.123rf.com/450wm/iconcraftstudio/iconcraftstudio1602/iconcraftstudio160200165/52362802-game-joystick-vector-icon.jpg?ver=6",
        "https://pixabay.com/get/54e3dd4a4853aa14f1dc8460da29317e1137dfec535373_640.png"
    ];
    let random: number;
    do {
        random = Math.floor(Math.random() * urls.length);
    } while (lastpush == random);
    lastpush = random;
    return urls[random];
}

