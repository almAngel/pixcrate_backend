"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBundleSchema = void 0;
const GenericSchema_1 = __importDefault(require("./GenericSchema"));
const Requirements_1 = require("../decorators/Requirements");
class AuthBundleSchema extends GenericSchema_1.default {
    constructor() {
        super();
        this.u_id = "";
        this.public_ip = "";
        this.ref_token = "";
    }
    getSchemaDefinition() {
        return super.getSchemaDefinition(this);
    }
}
exports.AuthBundleSchema = AuthBundleSchema;
__decorate([
    (0, Requirements_1.Requirements)({ required: true, unique: true, type: String }),
    __metadata("design:type", Object)
], AuthBundleSchema.prototype, "u_id", void 0);
__decorate([
    (0, Requirements_1.Requirements)({ required: true, type: String }),
    __metadata("design:type", Object)
], AuthBundleSchema.prototype, "public_ip", void 0);
__decorate([
    (0, Requirements_1.Requirements)({ required: true, unique: true, type: String }),
    __metadata("design:type", Object)
], AuthBundleSchema.prototype, "ref_token", void 0);
//# sourceMappingURL=AuthBundleSchema.js.map