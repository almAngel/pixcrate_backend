"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
class TokenManager {
    static encode({ data, expirationTime = undefined }) {
        let result;
        if (expirationTime != undefined) {
            result = jsonwebtoken_1.default.sign(data, fs_1.default.readFileSync("./private.key", 'utf8'), { algorithm: 'RS256', expiresIn: expirationTime });
        }
        else {
            result = jsonwebtoken_1.default.sign(data, fs_1.default.readFileSync("./private.key", 'utf8'), { algorithm: 'RS256' });
        }
        return result;
    }
    static decode(token) {
        return jsonwebtoken_1.default.decode(token, { json: true });
    }
    static verify(token) {
        return jsonwebtoken_1.default.verify(token, fs_1.default.readFileSync("./public.key", 'utf8'), { algorithms: ['RS256'] });
    }
    static expired(token) {
        let decoded = Object(this.verify(token));
        let expired = false;
        if (Math.floor(Date.now() / 1000) >= decoded.exp) {
            expired = true;
        }
        return expired;
    }
}
exports.default = TokenManager;
//# sourceMappingURL=TokenManager.js.map