"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boot = Boot;
const ServerManager_1 = require("../helpers/ServerManager");
const fs_1 = require("fs");
function Boot() {
    return function (constructor) {
        (0, fs_1.readdir)("./local" + ServerManager_1.ServerManager.config().controllers_path, (err, files) => {
            files = files.filter((e) => {
                return e.endsWith(".js");
            });
            files.forEach(e => {
                require("../" + ServerManager_1.ServerManager.config().controllers_path + "/" + e);
            });
        });
    };
}
//# sourceMappingURL=Boot.js.map