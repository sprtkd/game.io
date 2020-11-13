import { xml2json } from "xml-js";
import { GameElement, ROMElement } from "./iagl_system_parser_roms";

export function getSizeInMB(size: string) {
    if (size) {
        return Math.floor(parseInt(size) / (1024 * 1024));
    } else {
        return 0;
    }
}

export function getCateg(gameToConvert: GameElement) {
    let text = gameToConvert.year?._text + " " +
        gameToConvert.studio?._text + " | " + gameToConvert.genre?._text
        + " " + gameToConvert.perspective?._text
        + (gameToConvert.rating?._text ? " ⚡" + gameToConvert.rating?._text : "");
    return text.split("undefined").join("");
}

export function xmlToJson(xmlData: string) {
    return xml2json(xmlData, { compact: true, spaces: 4 });
}