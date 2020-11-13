import { getAllSystemXMLs } from "./api/github_call";
import { BaseGitContentModel, SystemIAGLModel } from "./models/basic_models";
import { processSystemData } from "./service/system_service";
import { writeToJson } from "./writer/json_write";

export async function getListFromIAGL() {
    try {
        await writeToJson(await processAllSystems(await getAllSystemXMLs()));
    } catch (error) {
        console.error("FATAL: Failed to process all data");
    }
}

async function processAllSystems(datalist: BaseGitContentModel[]) {
    let systemList: SystemIAGLModel[] = [];
    for (let data of datalist) {
        console.log("Processing: " + data.name);
        let systemProcessed = await processSystemData(data.download_url);
        if (systemProcessed) {
            console.log("System processed: Name: " + systemProcessed.name
                + "games count: " + systemProcessed.gamesCount);
            systemList.push(systemProcessed);
        }
    }
}