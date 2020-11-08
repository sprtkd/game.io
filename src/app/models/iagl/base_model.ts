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
    gameslist: any[];
}

export interface IAGLMedia {
    thumbnail: string;
    banner: string;
    fanart: string;
    logo: string;
    trailer: string;
}