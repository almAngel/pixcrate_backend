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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const ContentType_1 = require("../../enum/ContentType");
const AbstractController_1 = require("../../controllers/AbstractController");
const Tools_1 = require("../../helpers/Tools");
const TokenManager_1 = __importDefault(require("../../helpers/TokenManager"));
const AuthBridge_1 = __importDefault(require("../../helpers/AuthBridge"));
const public_ip_1 = require("public-ip");
const GenericDAO_1 = require("../../schemas/dao/GenericDAO");
const UserSchema_1 = require("../../schemas/UserSchema");
const bootstrapper_1 = require("../../../bootstrapper");
const body_parser_1 = __importDefault(require("body-parser"));
const express_formidable_1 = __importDefault(require("express-formidable"));
function POST({ path, produces = ContentType_1.ContentType.TEXT_PLAIN, consumes = ContentType_1.ContentType.TEXT_PLAIN, sealed = false }) {
    let originalMethod;
    let result;
    let response;
    let bridge;
    let genericDAO;
    let middleware;
    let doDummy = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        response = "";
        res.setHeader("Content-type", produces);
        if (sealed) {
            let token = req.header("px-token");
            if (token) {
                try {
                    if (!TokenManager_1.default.expired(token)) {
                        genericDAO = new GenericDAO_1.GenericDAO(UserSchema_1.UserSchema);
                        let n = yield genericDAO.count({
                            access_token: token
                        });
                        if (n == 1) {
                            AbstractController_1.AbstractController.setMetadata("px-token", req.header("px-token"));
                        }
                        else {
                            response = {
                                msg: "Unauthorized: User not found",
                                status: 403
                            };
                        }
                    }
                }
                catch (e) {
                    if (e.message == "invalid signature") {
                        response = {
                            msg: "Error: Malformed access token",
                            status: 400
                        };
                    }
                    else {
                        bridge = new AuthBridge_1.default(yield (0, public_ip_1.v4)(), token);
                        response = yield bridge.response;
                    }
                }
            }
            else {
                response = {
                    msg: "Unauthorized: Access token required",
                    status: 403
                };
            }
        }
        AbstractController_1.AbstractController.setMetadata("request", req);
        AbstractController_1.AbstractController.setMetadata("response", res);
        AbstractController_1.AbstractController.setMetadata("urlParams", req.params);
        AbstractController_1.AbstractController.setMetadata("status", 200);
        AbstractController_1.AbstractController.setMetadata("next", next);
        if (response) {
            (0, Tools_1.handledSend)(response);
        }
    });
    return function (target, propertyKey, descriptor) {
        originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let finalPath = String(args[0] + path).replace("//", "/");
            if (consumes == ContentType_1.ContentType.APP_JSON || consumes == undefined) {
                result = bootstrapper_1.App.serverManager.getInstance().post(finalPath, [body_parser_1.default.json(), body_parser_1.default.urlencoded({ extended: true })], (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                    yield doDummy(req, res, next);
                    originalMethod.apply(this, args);
                }));
            }
            else if (consumes == ContentType_1.ContentType.IMAGE_JPEG) {
                result = bootstrapper_1.App.serverManager.getInstance().post(finalPath, (0, express_formidable_1.default)(), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                    yield doDummy(req, res, next);
                    originalMethod.apply(this, args);
                }));
            }
            else {
                result = bootstrapper_1.App.serverManager.getInstance().post(finalPath, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                    yield doDummy(req, res, next);
                    originalMethod.apply(this, args);
                }));
            }
        };
        return result;
    };
}
//# sourceMappingURL=POST.js.map