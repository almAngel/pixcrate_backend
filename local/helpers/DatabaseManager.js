"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseManager = void 0;
const config_json_1 = __importDefault(require("../../config.json"));
const mongoose_1 = __importDefault(require("mongoose"));
class DatabaseManager {
    constructor() {
        this.instance = mongoose_1.default;
        this.instance = mongoose_1.default;
    }
    connect() {
        this.instance.connect(DatabaseManager.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, (err) => {
            if (err)
                throw err;
            console.log(`>>> Connection to selected database made at ${DatabaseManager.date.getHours()}:${DatabaseManager.date.getMinutes()}:${DatabaseManager.date.getSeconds()} on ${DatabaseManager.date.getMonth()}/${DatabaseManager.date.getDay()}/${DatabaseManager.date.getFullYear()}`);
        });
    }
    getInstance() {
        return this.instance;
    }
    static getConfig() {
        return config_json_1.default;
    }
    static getUrl() {
        return this.url;
    }
    perform(action) {
        this.connect();
        action();
        this.disconnect();
    }
    disconnect() {
        this.instance.disconnect();
    }
}
exports.DatabaseManager = DatabaseManager;
DatabaseManager.url = config_json_1.default.database_route;
DatabaseManager.date = new Date();
//# sourceMappingURL=DatabaseManager.js.map