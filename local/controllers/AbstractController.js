"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractController = void 0;
class AbstractController {
    constructor() { }
    static metadata(prop) {
        let data;
        if (Reflect.getMetadata(prop, AbstractController.prototype)) {
            data = Reflect.getMetadata(prop, AbstractController.prototype);
        }
        else {
            let err = new Error(`This metadata property '${prop}' doesn't exist inside ` + Reflect.getMetadata("rootPath", AbstractController.prototype));
            Error.captureStackTrace(err, this.metadata);
            throw err;
        }
        return data;
    }
    static setMetadata(prop, value) {
        Reflect.defineMetadata(prop, value, AbstractController.prototype);
    }
}
exports.AbstractController = AbstractController;
//# sourceMappingURL=AbstractController.js.map