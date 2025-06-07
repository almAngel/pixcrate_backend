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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const AbstractController_1 = require("./AbstractController");
const ContentType_1 = require("../enum/ContentType");
const HomeService_1 = __importDefault(require("../services/HomeService"));
const Tools_1 = require("../helpers/Tools");
const POST_1 = require("../decorators/httpverbs/POST");
const RestController_1 = require("../decorators/RestController");
const DELETE_1 = require("../decorators/httpverbs/DELETE");
let HomeController = class HomeController extends AbstractController_1.AbstractController {
    constructor() {
        super();
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            response = yield HomeService_1.default.getAccessToken();
            (0, Tools_1.handledSend)(response);
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            response = yield HomeService_1.default.registerUser();
            (0, Tools_1.handledSend)(response);
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            response = yield HomeService_1.default.destroySession();
            (0, Tools_1.handledSend)(response);
        });
    }
};
exports.HomeController = HomeController;
__decorate([
    (0, POST_1.POST)({ path: "/access", produces: ContentType_1.ContentType.APP_JSON, consumes: ContentType_1.ContentType.APP_JSON }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getAccessToken", null);
__decorate([
    (0, POST_1.POST)({ path: "/new", produces: ContentType_1.ContentType.APP_JSON, consumes: ContentType_1.ContentType.APP_JSON }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "register", null);
__decorate([
    (0, DELETE_1.DELETE)({ path: "/end", produces: ContentType_1.ContentType.APP_JSON, consumes: ContentType_1.ContentType.APP_JSON, sealed: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "logout", null);
exports.HomeController = HomeController = __decorate([
    (0, RestController_1.RestController)("/home"),
    __metadata("design:paramtypes", [])
], HomeController);
//# sourceMappingURL=HomeController.js.map