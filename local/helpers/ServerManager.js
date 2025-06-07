"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerManager = void 0;
const express_1 = __importDefault(require("express"));
const config_json_1 = __importDefault(require("../../config.json"));
const cors_1 = __importDefault(require("cors"));
class ServerManager {
    constructor() {
        this.instance = (0, express_1.default)();
        this.instance.use((0, cors_1.default)());
        this.instance.listen(process.env.PORT || ServerManager.cfg.default_port, () => {
            console.log("Server initialized at port " + ServerManager.cfg.server_route + ":" + process.env.PORT || ServerManager.cfg.default_port);
        })
            .on("error", (e) => {
            console.log("Error: Couldn't start a new server");
        });
    }
    getInstance() {
        return this.instance;
    }
    ;
    static getPort() {
        return this.cfg.default_port;
    }
    static config() {
        return this.cfg;
    }
}
exports.ServerManager = ServerManager;
ServerManager.cfg = config_json_1.default;
//# sourceMappingURL=ServerManager.js.map