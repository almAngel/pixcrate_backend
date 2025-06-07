"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericDAO = void 0;
const DatabaseManager_1 = require("../../helpers/DatabaseManager");
const mongodb_1 = require("mongodb");
class GenericDAO {
    constructor(type) {
        this.type = type;
    }
    load(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let finalResponse;
            let databaseResponse;
            let databaseManager;
            databaseManager = new DatabaseManager_1.DatabaseManager();
            GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;
            databaseManager.connect();
            databaseResponse = yield GenericDAO.model.findOne(body).exec();
            if (databaseResponse != null) {
                finalResponse = databaseResponse;
            }
            else {
                finalResponse = {
                    msg: `Error: Document of type ${this.type.name.replace("Schema", "")} not found`,
                    status: 404
                };
            }
            return finalResponse;
        });
    }
    loadById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let finalResponse;
            let databaseResponse;
            let databaseManager;
            databaseManager = new DatabaseManager_1.DatabaseManager();
            GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;
            databaseManager.connect();
            if (mongodb_1.ObjectId.isValid(id)) {
                databaseResponse = yield GenericDAO.model.findById(id).exec();
            }
            else {
                databaseResponse = {
                    msg: `Error: Document of type ${this.type.name.replace("Schema", "")} not found`,
                    status: 404
                };
            }
            if (databaseResponse != null) {
                finalResponse = databaseResponse;
            }
            else {
                finalResponse = {
                    msg: `Error: Document of type ${this.type.name.replace("Schema", "")} not found`,
                    status: 404
                };
            }
            return finalResponse;
        });
    }
    loadGroup(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let finalResponse;
            let databaseResponse;
            let databaseManager;
            databaseManager = new DatabaseManager_1.DatabaseManager();
            GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;
            databaseManager.connect();
            databaseResponse = yield GenericDAO.model.find(body).exec();
            if (databaseResponse != null) {
                finalResponse = databaseResponse;
            }
            else {
                finalResponse = {
                    msg: `Error: Documents of type ${this.type.name.replace("Schema", "")} not found`,
                    status: 404
                };
            }
            return finalResponse;
        });
    }
    saveOrUpdate(_a) {
        return __awaiter(this, arguments, void 0, function* ({ body, id, returnResult }) {
            let finalResponse;
            let databaseResponse;
            let databaseManager;
            databaseManager = new DatabaseManager_1.DatabaseManager();
            GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;
            databaseManager.connect();
            if (id != undefined) {
                if (mongodb_1.ObjectId.isValid(id)) {
                    databaseResponse = yield GenericDAO.model.findByIdAndUpdate(id, body).exec();
                    if (databaseResponse) {
                        if (returnResult) {
                            finalResponse = databaseResponse;
                        }
                        else {
                            finalResponse = {
                                msg: `Document of type ${this.type.name.replace("Schema", "")} successfully updated`,
                                status: 200
                            };
                        }
                    }
                    else {
                        finalResponse = {
                            msg: `Error: Document of type ${this.type.name.replace("Schema", "")} couldn't be updated`,
                            status: 404
                        };
                    }
                }
                else {
                    finalResponse = {
                        msg: `Error: Document of type ${this.type.name.replace("Schema", "")} not found`,
                        status: 404
                    };
                }
            }
            else {
                try {
                    databaseResponse = yield GenericDAO.model.create(body);
                    if (returnResult) {
                        finalResponse = databaseResponse;
                        finalResponse.status = 201;
                    }
                    else {
                        finalResponse = {
                            msg: `Document of type ${this.type.name.replace("Schema", "")} successfully inserted`,
                            status: 201
                        };
                    }
                }
                catch (e) {
                    if (e.code == 11000) {
                        finalResponse = {
                            msg: `Error: Documents of type ${this.type.name.replace("Schema", "")} couldn't be inserted`,
                            cause: "Data from one or more fields marked as unique collided with request body",
                            causeCode: e.code,
                            status: 409
                        };
                    }
                    else {
                        finalResponse = {
                            msg: `Error: Documents of type ${this.type.name.replace("Schema", "")} couldn't be inserted`,
                            cause: "Missing required data",
                            causeCode: 12000,
                            status: 422
                        };
                    }
                }
            }
            return finalResponse;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let finalResponse;
            let databaseResponse;
            let databaseManager;
            databaseManager = new DatabaseManager_1.DatabaseManager();
            GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;
            databaseManager.connect();
            databaseResponse = yield GenericDAO.model.findByIdAndDelete(id).exec();
            if (databaseResponse) {
                finalResponse = {
                    msg: `Documents of type ${this.type.name.replace("Schema", "")} has been successfully deleted`,
                    status: 200
                };
            }
            else {
                finalResponse = {
                    msg: `Error: Documents of type ${this.type.name.replace("Schema", "")} couldn't be deleted`,
                    status: 404
                };
            }
            return finalResponse;
        });
    }
    count(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let finalResponse;
            let databaseResponse;
            let databaseManager;
            databaseManager = new DatabaseManager_1.DatabaseManager();
            GenericDAO.model = require("../models/" + this.type.name.replace("Schema", "Model")).Model;
            databaseManager.connect();
            databaseResponse = yield GenericDAO.model.countDocuments(body).exec();
            if (databaseResponse != null) {
                finalResponse = databaseResponse;
            }
            else {
                finalResponse = {
                    msg: `Error: Document of type ${this.type.name.replace("Schema", "")} not found`,
                    status: 404
                };
            }
            return finalResponse;
        });
    }
}
exports.GenericDAO = GenericDAO;
//# sourceMappingURL=GenericDAO.js.map