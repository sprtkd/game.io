import fs from 'fs';
import { GameIAGLModel, SystemIAGLModel } from '../models/basic_models';
import filenamify from 'filenamify';
import { MasterInfoModel } from '../models/write_models';
import path from 'path';

const ASSETS_PATH = "assets/";
const SYSTEMS_PATH = ASSETS_PATH + "systems/";
const GAMES_PATH = "games/";
const MASTER_FILE = ASSETS_PATH + "main.json";
const SYSTEM_FILE = "system.json";
const JSON_EXT = '.json';

export function writeSystemToJson(systemToWrite: SystemIAGLModel) {
    console.log("Writing: " + systemToWrite.name);
    let gameslist = (systemToWrite.gameslist as GameIAGLModel[]);
    let gamesPathList: string[] = [];
    let systemFolder = convertToFilename(systemToWrite.name);
    let systemPath = SYSTEMS_PATH + systemFolder + '/';
    for (let game of gameslist) {
        gamesPathList.push(writeGameToFile(game, systemPath));
    }
    systemToWrite.gameslist = gamesPathList;
    if (systemToWrite.gameslist.length != systemToWrite.gamesCount) {
        console.log("Games count not matching");
        systemToWrite.gameslist.length = systemToWrite.gamesCount;
    }
    let systemFilePath = systemPath + SYSTEM_FILE;
    writeFile(systemFilePath, systemToWrite);
    updateMasterFile(systemFilePath);
}

function writeGameToFile(gameToWrite: GameIAGLModel, systemPath: string): string {
    let gameFileName = convertToFilename(gameToWrite.name);
    let gameFilePath = systemPath + GAMES_PATH + gameFileName;
    let counter = 1;
    while (fs.existsSync(gameFilePath + JSON_EXT)) {
        gameFilePath = gameFilePath + '_' + counter;
    }
    gameFilePath = gameFilePath + JSON_EXT;
    writeFile(gameFilePath, gameToWrite);
    return gameFilePath;
}

function updateMasterFile(systemFilePath: string) {
    let info: MasterInfoModel;
    if (!fs.existsSync(MASTER_FILE)) {
        info = new MasterInfoModel();
    } else {
        info = readFile(MASTER_FILE);
    }
    info.systemCount = info.systemCount + 1;
    info.systemlist.push(systemFilePath);
    writeFile(MASTER_FILE, info);
}

export function purgeAssets() {
    try {
        fs.rmdirSync(ASSETS_PATH, { recursive: true });
    } catch (error) {
        console.log("Purge failed: " + error);
    }
}

function writeFile(file: string, data: any) {
    try {
        let json = JSON.stringify(data, null, 4);
        let filepath = path.dirname(file);
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }
        fs.writeFileSync(file, json, 'utf8');
    } catch (error) {
        console.log("Write failed: " + error);
    }
}

function readFile(filename: string) {
    try {
        return JSON.parse(fs.readFileSync(filename, 'utf8'));
    } catch (error) {
        console.log("Read failed: " + error);
        return undefined;
    }
}


function convertToFilename(input: string) {
    input = input.replace(/\W/g, '_');
    input = filenamify(input, { replacement: '_' });
    return input;
}