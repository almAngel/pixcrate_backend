import { ServerManager } from "../helpers/ServerManager";
import { readdirSync, readdir } from "fs";

export function Boot() {
    return function (constructor: Function) {

        readdir("./local" + ServerManager.config().controllers_path, (err, files) => {
            files = files.filter((e) => {
                return e.endsWith(".js");
            });
            files.forEach(e => {
                require("../" + ServerManager.config().controllers_path + "/" + e);
            });
        });
    }
}