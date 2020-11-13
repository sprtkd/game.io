import { getListFromIAGL } from "./src/iagl_proc";

console.log("---IAGL Parser---");
getListFromIAGL().then(
    () => console.log("---Parser Finished---")
)
