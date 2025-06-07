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
const ImageSchema_1 = require("../schemas/ImageSchema");
const GenericDAO_1 = require("../schemas/dao/GenericDAO");
const AuthBundleSchema_1 = require("../schemas/AuthBundleSchema");
const DatabaseManager_1 = require("../helpers/DatabaseManager");
const AbstractController_1 = require("../controllers/AbstractController");
const BucketManager_1 = require("../helpers/BucketManager");
const TokenManager_1 = __importDefault(require("../helpers/TokenManager"));
const config_json_1 = __importDefault(require("../../config.json"));
class UploadService {
    constructor() {
    }
    static upload() {
        return __awaiter(this, void 0, void 0, function* () {
            let response, responseAux;
            let access_token;
            let databaseManager;
            let bucketManager;
            databaseManager = new DatabaseManager_1.DatabaseManager();
            bucketManager = new BucketManager_1.BucketManager();
            this.imageDAO = new GenericDAO_1.GenericDAO(ImageSchema_1.ImageSchema);
            this.authBundleDAO = new GenericDAO_1.GenericDAO(AuthBundleSchema_1.AuthBundleSchema);
            let tokenAux = AbstractController_1.AbstractController.metadata("request").header("px-token");
            let refToken = Object(TokenManager_1.default.decode(tokenAux)).ref_token;
            let file = AbstractController_1.AbstractController.metadata("request").files["image"];
            let visibility = AbstractController_1.AbstractController.metadata("request").fields["visibility"];
            let description = AbstractController_1.AbstractController.metadata("request").fields["description"];
            response = yield this.authBundleDAO.load({
                ref_token: refToken
            });
            if (!TokenManager_1.default.expired(tokenAux)) {
                responseAux = yield this.imageDAO.saveOrUpdate({
                    body: {
                        u_id: response.u_id,
                        description: description,
                        visibility: visibility
                    },
                    returnResult: true
                });
                if (responseAux.status == 201) {
                    bucketManager.uploadFile({
                        file: file,
                        visibility: visibility,
                        url: response.u_id + "/" + UploadService.cfg.app + "/" + visibility + "/" + responseAux._id + ".jpg",
                        onSuccess: (url) => __awaiter(this, void 0, void 0, function* () {
                            let image = {
                                url: `https://${UploadService.cfg.s3_bucket}.s3.${UploadService.cfg.s3_region}.amazonaws.com/` + url
                            };
                            yield this.imageDAO.saveOrUpdate({
                                body: image,
                                id: responseAux._id
                            });
                        })
                    });
                }
                else {
                    response = responseAux;
                }
            }
            return response;
        });
    }
}
exports.UploadService = UploadService;
UploadService.cfg = config_json_1.default;
//# sourceMappingURL=UploadService.js.map