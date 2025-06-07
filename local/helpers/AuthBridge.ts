import { Observable } from "rxjs";
import { GenericDAO } from "../schemas/dao/GenericDAO";
import { AuthBundleSchema } from "../schemas/AuthBundleSchema";
import TokenManager from "./TokenManager";
import { UserSchema } from "../schemas/UserSchema";

export default class AuthBridge extends Observable<any> {

    private genericDAO: GenericDAO<any>;
    public response: any;

    constructor(public_ip: string, access_token: string) {

        super(sub => {
            sub.complete();
        });

        let genericDAO = this.genericDAO;

        this.response = new Promise((resolve, reject) => {
            this.subscribe({
                async complete() {
                    //INNER RESPONSE
                    let r, fin;
                    genericDAO = new GenericDAO(AuthBundleSchema);

                    r = await genericDAO.load({
                        public_ip: public_ip
                    });

                    if (r.status == 404) {

                        genericDAO = new GenericDAO(AuthBundleSchema);
                        /*
                        await genericDAO.saveOrUpdate({
                            body: {
                                public_ip: public_ip
                            },
                            id: r.u_id
                        });
                        */

                        return {
                            msg: "Unauthorized: There doesn't exist a token associated with this IP, so on we registered this new IP. Try again.",
                            status: 403
                        }
                        

                    } else {

                        let tokenContent = Object(TokenManager.decode(access_token));

                        // IF THE USER MAKING THE REQUEST IS THE REAL ONE
                        if (r.ref_token == tokenContent.ref_token) {

                            //MAKE A NEW ACCESS TOKEN
                            let access_token = TokenManager.encode({
                                data: {
                                    ref_token: r.ref_token
                                },
                                expirationTime: '1d'
                            });

                            genericDAO = new GenericDAO(UserSchema);

                            await genericDAO.saveOrUpdate({
                                body: {
                                    access_token: access_token
                                },
                                id: r.u_id
                            });

                            fin = {
                                access_token: access_token,
                                status: 200
                            }
                        } else {
                            
                        }
                    }
                    resolve(fin);
                }

            });
        });

        return this;
    }
}