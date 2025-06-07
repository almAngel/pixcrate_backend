"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const DatabaseManager_1 = require("../../helpers/DatabaseManager");
const UserSchema_1 = require("../UserSchema");
exports.Model = new DatabaseManager_1.DatabaseManager().getInstance().model(UserSchema_1.UserSchema.name.toLowerCase().replace("schema", ""), new UserSchema_1.UserSchema().getSchemaDefinition());
//# sourceMappingURL=UserModel.js.map