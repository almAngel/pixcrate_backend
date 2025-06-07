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
const rxjs_1 = require("rxjs");
const GenericDAO_1 = require("../schemas/dao/GenericDAO");
const AuthBundleSchema_1 = require("../schemas/AuthBundleSchema");
const TokenManager_1 = __importDefault(require("./TokenManager"));
const UserSchema_1 = require("../schemas/UserSchema");
class AuthBridge extends rxjs_1.Observable {
    constructor(public_ip, access_token) {
        super(sub => {
            sub.complete();
        });
        let genericDAO = this.genericDAO;
        this.response = new Promise((resolve, reject) => {
            this.subscribe({
                complete() {
                    return __awaiter(this, void 0, void 0, function* () {
                        let r, fin;
                        genericDAO = new GenericDAO_1.GenericDAO(AuthBundleSchema_1.AuthBundleSchema);
                        r = yield genericDAO.load({
                            public_ip: public_ip
                        });
                        if (r.status == 404) {
                            genericDAO = new GenericDAO_1.GenericDAO(AuthBundleSchema_1.AuthBundleSchema);
                            return {
                                msg: "Unauthorized: There doesn't exist a token associated with this IP, so on we registered this new IP. Try again.",
                                status: 403
                            };
                        }
                        else {
                            let tokenContent = Object(TokenManager_1.default.decode(access_token));
                            if (r.ref_token == tokenContent.ref_token) {
                                let access_token = TokenManager_1.default.encode({
                                    data: {
                                        ref_token: r.ref_token
                                    },
                                    expirationTime: '1d'
                                });
                                genericDAO = new GenericDAO_1.GenericDAO(UserSchema_1.UserSchema);
                                yield genericDAO.saveOrUpdate({
                                    body: {
                                        access_token: access_token
                                    },
                                    id: r.u_id
                                });
                                fin = {
                                    access_token: access_token,
                                    status: 200
                                };
                            }
                            else {
                            }
                        }
                        resolve(fin);
                    });
                }
            });
        });
        return this;
    }
}
exports.default = AuthBridge;
//# sourceMappingURL=AuthBridge.js.map