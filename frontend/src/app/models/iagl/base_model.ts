import { GameElement } from './iagl_system_parser_roms';

export interface BaseGitContentModel {
    name: string;
    download_url: string;
    type: string;
}

export interface SystemIAGLModel {
    name: string;
    basename: string;
    description: string;
    category: string;
    base_url: string;
    media: IAGLMedia;
    gamesCount: number;
    gameslist: GameIAGLModel[];
    cache: GameElement[];
}

export interface GameIAGLModel {
    name: string;
    description: string;
    category: string;
    download_url: string;
    cacheImgUrl: string;
    media: IAGLMedia;
    gameSize: number;
}

export interface IAGLMedia {
    thumbnail: string;
    banner: string;
    fanart: string;
    logo: string;
    trailer: string;
}