// AuthBridge is a helper class for handling authentication and token renewal based on public IP and access token.
// It extends Observable to allow asynchronous response handling and integrates with the data access layer.

import { Observable } from "rxjs";
import { GenericDAO } from "../schemas/dao/GenericDAO";
import { AuthBundleSchema } from "../schemas/AuthBundleSchema";
import TokenManager from "./TokenManager";
import { UserSchema } from "../schemas/UserSchema";

/**
 * AuthBridge handles authentication logic for requests, including token validation and renewal.
 * It checks if a token is associated with a given public IP and, if valid, issues a new access token.
 *
 * Usage:
 *   new AuthBridge(public_ip, access_token).response.then(...)
 */
export default class AuthBridge extends Observable<any> {
    private genericDAO: GenericDAO<any>;
    public response: any;

    /**
     * @param public_ip - The public IP address of the client making the request.
     * @param access_token - The access token provided by the client.
     */
    constructor(public_ip: string, access_token: string) {
        super(sub => {
            sub.complete();
        });
        let genericDAO = this.genericDAO;
        this.response = new Promise((resolve, reject) => {
            this.subscribe({
                async complete() {
                    // Attempt to load the AuthBundle for the given public IP
                    let r, fin;
                    genericDAO = new GenericDAO(AuthBundleSchema);
                    r = await genericDAO.load({ public_ip: public_ip });
                    if (r.status == 404) {
                        // If no AuthBundle exists for this IP, return unauthorized
                        genericDAO = new GenericDAO(AuthBundleSchema);
                        /*
                        await genericDAO.saveOrUpdate({
                            body: { public_ip: public_ip },
                            id: r.u_id
                        });
                        */
                        return {
                            msg: "Unauthorized: There doesn't exist a token associated with this IP, so on we registered this new IP. Try again.",
                            status: 403
                        }
                    } else {
                        // Decode the provided access token
                        let tokenContent = Object(TokenManager.decode(access_token));
                        // If the token matches the reference token, issue a new access token
                        if (r.ref_token == tokenContent.ref_token) {
                            let access_token = TokenManager.encode({
                                data: { ref_token: r.ref_token },
                                expirationTime: '1d'
                            });
                            genericDAO = new GenericDAO(UserSchema);
                            await genericDAO.saveOrUpdate({
                                body: { access_token: access_token },
                                id: r.u_id
                            });
                            fin = {
                                access_token: access_token,
                                status: 200
                            }
                        } else {
                            // If the token does not match, do not issue a new token
                        }
                    }
                    resolve(fin);
                }
            });
        });
        return this;
    }
}