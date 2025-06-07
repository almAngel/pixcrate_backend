// Tools.ts provides utility functions for response handling and password hashing/comparison using bcrypt.

import { AbstractController } from "../controllers/AbstractController";
import bcrypt from "bcrypt";

/**
 * Safely sends a response using the response object from AbstractController's metadata.
 * If headers are already sent, calls the next middleware.
 * @param arg - The response payload to send.
 */
export function handledSend(arg: any) {
    try {
        if (!AbstractController.metadata("response").headersSent) {
            AbstractController.metadata("response").send(arg);
            AbstractController.metadata("response").end();
        } else {
            AbstractController.metadata("next")();
        }
    } catch (e) {
        Error.captureStackTrace(e, handledSend);
        throw e;
    }
}

/**
 * Generates a bcrypt hash for a given password string.
 * @param pass - The plain text password to hash.
 * @returns The hashed password string.
 */
export function hash(pass: string) {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync());
}

/**
 * Compares a plain text password with a bcrypt hash.
 * @param decrypted - The plain text password.
 * @param encrypted - The bcrypt hash to compare against.
 * @returns True if the password matches the hash, false otherwise.
 */
export function checkHash(decrypted: string, encrypted: string) {
    return bcrypt.compareSync(decrypted, encrypted);
}