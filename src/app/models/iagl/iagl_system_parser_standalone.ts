// To parse this data:
//
//   import { Convert, IAGLSystemStandalone } from "./file";
//
//   const iAGLSystemStandalone = Convert.toIAGLSystemStandalone(json);

export interface IAGLSystemStandalone {
    declaration: Declaration;
    datafile:    Datafile;
}

export interface Datafile {
    header: { [key: string]: Header };
    game:   Game;
}

export interface Game {
}

export interface Header {
    text: string;
}

export interface Declaration {
    attributes: Attributes;
}

export interface Attributes {
    version:  string;
    encoding: string;
}

// Converts JSON strings to/from your types
export class ConvertStandalone {
    public static toIAGLSystemStandalone(json: string): IAGLSystemStandalone {
        return JSON.parse(json);
    }

    public static iAGLSystemStandaloneToJson(value: IAGLSystemStandalone): string {
        return JSON.stringify(value);
    }
}
