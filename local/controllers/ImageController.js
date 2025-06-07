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
exports.ImageController = void 0;
const AbstractController_1 = require("./AbstractController");
const ContentType_1 = require("../enum/ContentType");
const Tools_1 = require("../helpers/Tools");
const GET_1 = require("../decorators/httpverbs/GET");
const POST_1 = require("../decorators/httpverbs/POST");
const RestController_1 = require("../decorators/RestController");
const ImageService_1 = require("../services/ImageService");
const DELETE_1 = require("../decorators/httpverbs/DELETE");
const PUT_1 = require("../decorators/httpverbs/PUT");
let ImageController = class ImageController extends AbstractController_1.AbstractController {
    constructor() {
        super();
    }
    upload() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            ImageService_1.ImageService.upload();
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            response = yield ImageService_1.ImageService.getAllImages();
            (0, Tools_1.handledSend)(response);
        });
    }
    getAllPublic() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            response = yield ImageService_1.ImageService.getAllPublicImages();
            (0, Tools_1.handledSend)(response);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            response = yield ImageService_1.ImageService.deleteImage();
            (0, Tools_1.handledSend)(response);
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            response = yield ImageService_1.ImageService.updateImage();
            (0, Tools_1.handledSend)(response);
        });
    }
};
exports.ImageController = ImageController;
__decorate([
    (0, POST_1.POST)({ path: "/new", produces: ContentType_1.ContentType.APP_JSON, consumes: ContentType_1.ContentType.IMAGE_JPEG, sealed: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "upload", null);
__decorate([
    (0, GET_1.GET)({ path: "/all", produces: ContentType_1.ContentType.APP_JSON, consumes: ContentType_1.ContentType.APP_JSON, sealed: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "getAll", null);
__decorate([
    (0, GET_1.GET)({ path: "/all-public", produces: ContentType_1.ContentType.APP_JSON, consumes: ContentType_1.ContentType.APP_JSON, sealed: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "getAllPublic", null);
__decorate([
    (0, DELETE_1.DELETE)({ path: "/:id", produces: ContentType_1.ContentType.APP_JSON, sealed: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "delete", null);
__decorate([
    (0, PUT_1.PUT)({ path: "/:id", produces: ContentType_1.ContentType.APP_JSON, consumes: ContentType_1.ContentType.APP_JSON, sealed: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "update", null);
exports.ImageController = ImageController = __decorate([
    (0, RestController_1.RestController)("/image"),
    __metadata("design:paramtypes", [])
], ImageController);
//# sourceMappingURL=ImageController.js.map