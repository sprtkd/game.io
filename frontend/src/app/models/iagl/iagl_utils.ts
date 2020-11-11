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
        name: gameToConvert.title_clean?._text ? gameToConvert.title_clean?._text : gameToConvert._attributes.name,
        category: getCateg(gameToConvert),
        description: gameToConvert.plot?._text,
        download_url: gameToConvert.rom instanceof Array ?
            gameToConvert.rom[0]._attributes.name : gameToConvert.rom._attributes.name,
        gameSize: getSize(gameToConvert),
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

function getSize(game: GameElement) {
    let size = (game.rom instanceof Array ?
        game.rom[0]._attributes.size : game.rom._attributes.size);
    if (size) {
        return Math.floor(parseInt(size) / (1024 * 1024));
    } else {
        return 0;
    }
}

function getCateg(gameToConvert: GameElement) {
    let text = gameToConvert.year?._text + " " +
        gameToConvert.studio?._text + " | " + gameToConvert.genre?._text
        + " " + gameToConvert.perspective?._text
        + (gameToConvert.rating?._text ? " ⚡" + gameToConvert.rating?._text : "");
    return text.split("undefined").join("");
}

var lastpush = 0;
function randomSystemUrl() {
    let urls = ["https://images.unsplash.com/photo-1580327332925-a10e6cb11baa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=351&q=80",
        "https://images.unsplash.com/photo-1531390658120-e06b58d826ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80",
        "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.pexels.com/photos/4511372/pexels-photo-4511372.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        "https://images.unsplash.com/photo-1585424249632-f4d52f602ca7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
        "https://images.unsplash.com/photo-1554213352-5ffe6534af08?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ];
    let random: number;
    do {
        random = Math.floor(Math.random() * urls.length);
    } while (lastpush == random);
    lastpush = random;
    return urls[random];
}

