"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
class Image {
    constructor(description, visibility, url) {
        this.description = description;
        this.visibility = visibility;
        this.url = url;
    }
    static parse(obj) {
        return new this(obj.description, obj.visibility, obj.url);
    }
}
exports.Image = Image;
//# sourceMappingURL=Image.js.map