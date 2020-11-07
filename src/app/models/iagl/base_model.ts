export interface BaseGitContentModel {
    name: string;
    download_url: string;
    type: string;
}

export function cleanData(datalist: BaseGitContentModel[]) {
    let ending = "_ZachMorris.xml";
    let ending2 = ".xml";
    for (let data of datalist) {
        if(data.name.endsWith(ending)) {
            data.name = data.name.substring(0,data.name.indexOf(ending));
        } else if(data.name.endsWith(ending2)) {
            data.name = data.name.substring(0,data.name.indexOf(ending2));
        }
        data.name = data.name.split('_').join(' ');
      }
}