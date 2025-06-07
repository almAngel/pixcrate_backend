import { AbstractController } from "../controllers/AbstractController";
import bcrypt from "bcrypt";


export function handledSend(arg: any) {
    try {
        if(!AbstractController.metadata("response").headersSent) {
            AbstractController.metadata("response").send(arg);
            AbstractController.metadata("response").end();
        } else {
            AbstractController.metadata("next")();
        }
    } catch(e) {
        Error.captureStackTrace(e, handledSend);
        throw e;
    }
}

export function hash(pass: string) {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync());
}

export function checkHash(decrypted: string, encrypted: string) {
    return bcrypt.compareSync(decrypted, encrypted);
}