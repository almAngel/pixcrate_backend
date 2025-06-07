// Boot decorator is used to initialize the application by dynamically loading all controller modules.
// It reads the controllers directory and requires each .js file, registering the controllers with the server.
// This enables automatic discovery and registration of all REST controllers at startup.

import { ServerManager } from "../helpers/ServerManager";
import { readdirSync, readdir } from "fs";

/**
 * Boot decorator for application entry point classes.
 * When applied, it loads all controller modules from the configured controllers_path.
 * This ensures all controllers are registered and their routes are available.
 */
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