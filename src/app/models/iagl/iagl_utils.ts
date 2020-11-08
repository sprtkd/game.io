import { xml2json } from "xml-js";
import { BaseGitContentModel, IAGLMedia, SystemIAGLModel } from './base_model';
import { Convert, IAGLSystem } from "./iagl_system_parser_roms";
import { ConvertStandalone, IAGLSystemStandalone } from "./iagl_system_parser_standalone";

const DEFAULT_URL = "https://pixabay.com/get/54e3dd4a4853aa14f1dc8460da29317e1137dfec535373_640.png";

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

export function convertSystemData(jsonStr: string) {
    let iAGLSystemJustParsed: IAGLSystem | IAGLSystemStandalone;
    try {
        iAGLSystemJustParsed = Convert.toIAGLSystem(jsonStr);
    } catch (error) {
        iAGLSystemJustParsed = ConvertStandalone.toIAGLSystemStandalone(jsonStr);
    }

    let systemIAGLModel: SystemIAGLModel = {
        name: iAGLSystemJustParsed.datafile.header.emu_name.text,
        basename: iAGLSystemJustParsed.datafile.header.emu_description.text,
        base_url: iAGLSystemJustParsed.datafile.header.emu_baseurl.text,
        category: iAGLSystemJustParsed.datafile.header.emu_category.text,
        description: iAGLSystemJustParsed.datafile.header.emu_description.text
            + ': ' + iAGLSystemJustParsed.datafile.header.emu_comment.text,
        gamesCount: 0,
        gameslist: [],
        media: undefined
    }
    if (iAGLSystemJustParsed.datafile.game instanceof Array) {
        systemIAGLModel.gamesCount = iAGLSystemJustParsed.datafile.game.length;
    }
    return systemIAGLModel;
}

export function populateMedia(name: string) {
    let media: IAGLMedia = {
        banner: null,
        fanart: null,
        logo: null,
        thumbnail: DEFAULT_URL,
        trailer: null
    };
    return media
}