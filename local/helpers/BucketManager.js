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
exports.BucketManager = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_json_1 = __importDefault(require("../../config.json"));
const fs_1 = require("fs");
const Tools_js_1 = require("./Tools.js");
class BucketManager {
    constructor() {
        this.instance = new aws_sdk_1.default.S3({});
        this.instance.config.region = "eu-west-3";
        this.instance.config.update({
            accessKeyId: BucketManager.cfg.s3_access,
            secretAccessKey: BucketManager.cfg.s3_secret,
        });
    }
    createFolder(_a) {
        return __awaiter(this, arguments, void 0, function* ({ folderPath, context }) {
            let response;
            let finalPath;
            finalPath = folderPath;
            if (context) {
                finalPath += ("/" + context);
            }
            this.instance.config.params = {
                Bucket: BucketManager.cfg.s3_bucket
            };
            this.instance.headBucket((err, data) => {
                if (err)
                    throw err;
            });
            this.instance.putObject({
                Bucket: BucketManager.cfg.s3_bucket,
                Key: finalPath,
                ServerSideEncryption: "AES256"
            }, (err, data) => {
                if (err)
                    throw err;
            });
        });
    }
    uploadFile({ file, visibility, url, onSuccess, onError }) {
        let response;
        let fileContent;
        let reader;
        if (file != undefined) {
            if (file.type == "image/jpeg") {
                let fileContent = (0, fs_1.readFileSync)(file.path);
                this.instance.config.params = {
                    Bucket: BucketManager.cfg.s3_bucket
                };
                this.instance.headBucket((err, data) => {
                    if (err)
                        throw err;
                });
                this.instance.putObject({
                    Bucket: BucketManager.cfg.s3_bucket,
                    ContentType: "image/jpeg",
                    Key: url,
                    Body: fileContent,
                    ACL: (visibility == "public") ? "public-read" : "",
                    ServerSideEncryption: "AES256"
                }, (err, data) => {
                    if (err)
                        throw err;
                })
                    .on("httpDone", () => {
                    (0, Tools_js_1.handledSend)({
                        msg: "File uploaded successfully",
                        status: 201
                    });
                    onSuccess(url);
                }).on("httpError", () => {
                    (0, Tools_js_1.handledSend)({
                        msg: "Error when uploading file",
                        status: 500
                    });
                    onError();
                });
            }
            else {
                (0, Tools_js_1.handledSend)({
                    msg: "Error: Unsupported Media Type",
                    status: 415
                });
                onError();
            }
        }
    }
    deleteFile({ url, onSuccess, onError }) {
        this.instance.config.params = {
            Bucket: BucketManager.cfg.s3_bucket
        };
        this.instance.headBucket((err, data) => {
            if (err)
                throw err;
        });
        if (url != undefined) {
            this.instance.deleteObject({
                Bucket: BucketManager.cfg.s3_bucket,
                Key: url
            }, (err, data) => {
                if (err) {
                    throw err;
                }
                else {
                    onSuccess();
                }
            });
            (0, Tools_js_1.handledSend)({
                msg: "File deleted successfully",
                status: 200
            });
        }
        else {
            (0, Tools_js_1.handledSend)({
                msg: "Error: You must specify an url",
                status: 500
            });
            onError();
        }
    }
}
exports.BucketManager = BucketManager;
BucketManager.cfg = config_json_1.default;
//# sourceMappingURL=BucketManager.js.map