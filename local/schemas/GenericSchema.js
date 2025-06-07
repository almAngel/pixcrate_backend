"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Requirements_1 = require("../decorators/Requirements");
class GenericSchema {
    constructor() { }
    getSchemaDefinition(o) {
        let props = Object.keys(o);
        var sd = {};
        for (let i = 0; i < props.length; i++) {
            let type = (typeof Object(o)[props[i]]);
            if ((0, Requirements_1.getRequirements)(props[i], o) != undefined) {
                Object.defineProperty(sd, props[i], {
                    writable: true,
                    value: (0, Requirements_1.getRequirements)(props[i], o),
                    enumerable: true,
                });
            }
            else {
                Object.defineProperty(sd, props[i], {
                    writable: true,
                    value: type,
                    enumerable: true,
                });
            }
        }
        return new mongoose_1.Schema(sd, { versionKey: false });
    }
}
exports.default = GenericSchema;
//# sourceMappingURL=GenericSchema.js.map