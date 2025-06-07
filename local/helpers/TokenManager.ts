// TokenManager is a helper class for handling JWT token operations such as encoding, decoding, verifying, and checking expiration.
// It uses RS256 algorithm and reads private/public keys from the local filesystem.

import jwt from "jsonwebtoken";
import fs from "fs";

/**
 * TokenManager provides static methods for JWT token management using RS256 keys.
 *
 * Usage:
 *   TokenManager.encode({ data: ..., expirationTime: ... })
 *   TokenManager.decode(token)
 *   TokenManager.verify(token)
 *   TokenManager.expired(token)
 */
export default class TokenManager {
    /**
     * Encodes data into a JWT token using the private key.
     * @param data - The payload to encode.
     * @param expirationTime - Optional expiration time (e.g., '1d', 3600).
     * @returns The signed JWT token as a string.
     */
    public static encode({ data, expirationTime = undefined }: { data: Object; expirationTime?: string | number; }) {
        let result: string;
        if (expirationTime != undefined) {
            result = jwt.sign(data, fs.readFileSync("./private.key", 'utf8'), { algorithm: 'RS256', expiresIn: expirationTime });
        } else {
            result = jwt.sign(data, fs.readFileSync("./private.key", 'utf8'), { algorithm: 'RS256' });
        }
        return result;
    }

    /**
     * Decodes a JWT token without verifying its signature.
     * @param token - The JWT token to decode.
     * @returns The decoded payload as an object.
     */
    public static decode(token: string) {
        return jwt.decode(token, { json: true });
    }

    /**
     * Verifies a JWT token's signature and validity using the public key.
     * @param token - The JWT token to verify.
     * @returns The decoded payload if valid, otherwise throws an error.
     */
    public static verify(token: string) {
        return jwt.verify(token, fs.readFileSync("./public.key", 'utf8'), { algorithms: ['RS256'] });
    }

    /**
     * Checks if a JWT token is expired based on its 'exp' claim.
     * @param token - The JWT token to check.
     * @returns True if expired, false otherwise.
     */
    public static expired(token: string): boolean {
        let decoded = Object(this.verify(token));
        let expired = false;
        if (Math.floor(Date.now() / 1000) >= decoded.exp) {
            expired = true;
        }
        return expired;
    }
}