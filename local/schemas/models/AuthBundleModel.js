"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const DatabaseManager_1 = require("../../helpers/DatabaseManager");
const AuthBundleSchema_1 = require("../AuthBundleSchema");
exports.Model = new DatabaseManager_1.DatabaseManager().getInstance().model(AuthBundleSchema_1.AuthBundleSchema.name.toLowerCase().replace("schema", ""), new AuthBundleSchema_1.AuthBundleSchema().getSchemaDefinition());
//# sourceMappingURL=AuthBundleModel.js.map