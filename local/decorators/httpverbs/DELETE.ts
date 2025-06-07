import { ContentType } from "../../enum/ContentType";
import { ServerManager } from "../../helpers/ServerManager";
import { AbstractController } from "../../controllers/AbstractController";
import { handledSend } from "../../helpers/Tools";
import TokenManager from "../../helpers/TokenManager";
import AuthBridge from "../../helpers/AuthBridge";
import { v4 as pipRetrieverV4 } from "public-ip";
import { GenericDAO } from "../../schemas/dao/GenericDAO";
import { UserSchema } from "../../schemas/UserSchema";
import { App } from "../../../bootstrapper";
import bodyParser = require("body-parser");
import formidable from "express-formidable";

export function DELETE({ path, produces = ContentType.TEXT_PLAIN, consumes = ContentType.TEXT_PLAIN, sealed = false }: { path: string; produces?: ContentType; consumes?: ContentType; sealed?: boolean }) {
    //Initialize variables
    let originalMethod: Function;
    let result: any;
    let response: any;
    let bridge: AuthBridge;
    let genericDAO: GenericDAO<UserSchema>;

    let doDummy = async (req: any, res: any, next: any) => {
        //Response reset
        response = "";

        //Set headers
        res.setHeader("Content-type", produces);

        if (sealed) {
            let token = req.header("px-token");
            if (token) {
                try {
                    if (!TokenManager.expired(token)) {
                        genericDAO = new GenericDAO(UserSchema);

                        let n = await genericDAO.count({
                            access_token: token
                        });

                        if (n == 1) {
                            AbstractController.setMetadata("px-token", req.header("px-token"));
                        } else {
                            response = {
                                msg: "Unauthorized: User not found",
                                status: 403
                            }
                        }

                    }
                } catch (e) {
                    if (e.message == "invalid signature") {
                        response = {
                            msg: "Error: Malformed access token",
                            status: 400
                        }
                    } else {
                        bridge = new AuthBridge(await pipRetrieverV4(), token);
                        response = await bridge.response;
                    }
                }
            } else {
                response = {
                    msg: "Unauthorized: Access token required",
                    status: 403
                }
            }
        }

        AbstractController.setMetadata("request", req);
        AbstractController.setMetadata("response", res);
        AbstractController.setMetadata("urlParams", req.params);
        AbstractController.setMetadata("status", 200);
        AbstractController.setMetadata("next", next);

        if (response) {
            handledSend(response);
        }

    }

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
        originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let finalPath = String(args[0] + path).replace("//", "/");

            if (consumes == ContentType.APP_JSON || consumes == undefined) {
                result = App.serverManager.getInstance().delete(finalPath, [bodyParser.json(), bodyParser.urlencoded({ extended: true })], async (req: any, res: any, next: any) => {
                    await doDummy(req, res, next);
                    originalMethod.apply(this, args);
                });
            } else if (consumes == ContentType.IMAGE_JPEG) {
                result = App.serverManager.getInstance().delete(finalPath, formidable(), async (req: any, res: any, next: any) => {
                    await doDummy(req, res, next);
                    originalMethod.apply(this, args);
                });
            } else {
                result = App.serverManager.getInstance().delete(finalPath, async (req: any, res: any, next: any) => {
                    await doDummy(req, res, next);
                    originalMethod.apply(this, args);
                });
            }
            return result;
        }
    }
}