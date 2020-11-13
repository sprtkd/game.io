export interface IAGLSystem {
    datafile: Datafile;
}

export interface Datafile {
    header: { [key: string]: Header };
    game: GameElement[] | GameElement;
}

export interface Header {
    _text?: string;
}

export interface GameAttributes {
    name: string;
}

export interface ROMElement {
    _attributes: PurpleAttributes;
}

export interface PurpleAttributes {
    name: string;
    size: string;
}

export interface GameElement {
    _attributes: GameAttributes;
    description: Header;
    rom: ROMElement[] | ROMElement;
    title_clean?: Header;
    plot?: Header;
    year?: Header;
    genre?: Header;
    studio?: Header;
    perspective?: Header;
    rating?: Header;
    thegamesdb_id?: Header;
    mobygames_url?: Header;
    giantbomb_url?: Header;
}

export function ConvertIaglSystem(json: string) {
    let objSystem: IAGLSystem = JSON.parse(json);
    return objSystem;
}