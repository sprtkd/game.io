import { RomIAGLModel } from "../models/basic_models";
import { ROMElement } from "../utils/iagl_system_parser_roms";
import { getSizeInMB } from "../utils/iagl_helper_utils";

export function processAllRoms(romlist: ROMElement[], baseurl: string, boxart: string) {
    let processedRomsList: RomIAGLModel[] = [];
    let iter = 1;
    for (let rom of romlist) {
        let processedRom = convertRomData(rom, baseurl, boxart, iter, romlist.length);
        if (processedRom) {
            console.log("Rom processed: " + processedRom.name);
            processedRomsList.push(processedRom);
        }
        iter += 1;
    }
    return processedRomsList;
}

function convertRomData(rom: ROMElement, baseurl: string,
    boxart: string, iter: number, total: number) {
    try {
        let processedRom: RomIAGLModel = {
            description: "Rom " + iter + " of " + total,
            downloadSize: getSizeInMB(rom._attributes.size),
            downloadUrl: baseurl + rom._attributes.name,
            media: {
                thumbnail: boxart
            },
            name: "Rom " + iter
        }
        return processedRom;
    } catch (error) {
        return undefined;
    }
}