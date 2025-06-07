"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const DatabaseManager_1 = require("../../helpers/DatabaseManager");
const ImageSchema_1 = require("../ImageSchema");
exports.Model = new DatabaseManager_1.DatabaseManager().getInstance().model(ImageSchema_1.ImageSchema.name.toLowerCase().replace("schema", ""), new ImageSchema_1.ImageSchema().getSchemaDefinition());
//# sourceMappingURL=ImageModel.js.map