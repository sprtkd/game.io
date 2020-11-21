export interface SystemIAGLModel {
    name: string;
    description: string;
    category: string;
    media: IAGLMedia;
    gamesCount: number;
    gameslist: string[];
    myOwnUrl: string;
}

export interface GameIAGLModel {
    name: string;
    description: string;
    category: string;
    media: IAGLMedia;
    romsCount: number;
    romsList: RomIAGLModel[];
    myOwnUrl: string;
}

export interface IAGLMedia {
    thumbnail: string;
}

export interface RomIAGLModel {
    name: string;
    description: string;
    media: IAGLMedia;
    downloadUrl: string;
    downloadSize: number;
}

export interface MasterInfoModel {
    dateOfUpdate: Date;
    maintainer: string;
    githubRepo: string;
    systemCount: number;
    systemlist: string[];
}