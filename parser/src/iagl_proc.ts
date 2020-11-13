import { getAllSystemXMLs } from "./api/github_call";
import { BaseGitContentModel, SystemIAGLModel } from "./models/basic_models";
import { processSystemData } from "./service/system_service";
import { purgeAssets, writeSystemToJson } from "./writer/json_write";

export async function getListFromIAGL() {
    purgeAssets();
    try {
        await processAllSystems(await getAllSystemXMLs());
    } catch (error) {
        console.error("FATAL: Failed to process all data");
    }
}

async function processAllSystems(datalist: BaseGitContentModel[]) {
    for (let data of datalist) {
        console.log("Processing: " + data.name);
        let systemProcessed = await processSystemData(data.download_url);
        if (systemProcessed) {
            console.log("System processed: Name: " + systemProcessed.name
                + "games count: " + systemProcessed.gamesCount);
            writeSystemToJson(systemProcessed);
        }
    }
}