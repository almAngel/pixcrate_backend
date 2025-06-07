import { UserSchema } from "../schemas/UserSchema";
import { GenericDAO } from "../schemas/dao/GenericDAO";
import { DatabaseManager } from "../helpers/DatabaseManager";
import TokenManager from "../helpers/TokenManager";
import { hash, checkHash } from "../helpers/Tools";
import { AbstractController } from "../controllers/AbstractController";
import { AuthBundleSchema } from "../schemas/AuthBundleSchema";
import publicIp from "public-ip";
import { BucketManager } from "../helpers/BucketManager";
import config from "../../config.json";
import { Schema, Model, DefaultSchemaOptions, Document, FlatRecord } from "mongoose";

// HomeService provides business logic for home-related operations such as authentication and registration.
// It is used by HomeController to handle requests and responses for /home endpoints.

/**
 * HomeService contains static methods for user authentication, registration, and session management.
 * Use these methods in controllers to implement business logic for home endpoints.
 */
export default class HomeService {

    private static requestBody: any;
    private static userDAO: GenericDAO<UserSchema>;
    private static authBundleDAO: GenericDAO<AuthBundleSchema>;
    private static readonly cfg = config;

    private constructor() { }

    /**
     * Authenticates a user and retrieves an access token.
     * @returns An object containing the access token and status.
     */
    public static async getAccessToken() {
        let response: any;
        let access_token, ref_token: string;
        let matches: boolean;
        let databaseManager: DatabaseManager;

        databaseManager = new DatabaseManager();

        //Create DAO
        this.userDAO = new GenericDAO(UserSchema);
        this.authBundleDAO = new GenericDAO(AuthBundleSchema);

        //Sift our request body
        this.requestBody = {
            email: AbstractController.metadata("request").body.email,
            password: AbstractController.metadata("request").body.password
        }

        //Does this User email exist? -> Retrieve user
        response = await this.userDAO.load({
            email: this.requestBody.email
        });

        try {

            matches = checkHash(AbstractController.metadata("request").body.password, response.password);
        } catch (e) {
            if (this.requestBody.password == undefined) {
                response = {
                    msg: "Error: Password required",
                    status: 422
                }
            } else {
                return response;
            }

            return response;

        }

        if (matches) {

            //REF_TOKEN
            ref_token = TokenManager.encode({
                data: {}
            });

            //REF_TOKEN INSIDE TOKEN
            access_token = TokenManager.encode({
                data: {
                    ref_token: ref_token
                },
                expirationTime: "1d"
            });

            //ASSOCIATE REF_TOKEN AND USER ID
            let aux = await this.authBundleDAO.load({
                u_id: response._id
            });

            //IF OUR REFRESH TOKEN ALREADY EXISTS -> UPDATE
            if (aux.status != 404) {
                await this.authBundleDAO.saveOrUpdate({
                    body: {
                        ref_token: ref_token,
                        public_ip: await publicIp.publicIp(),
                        u_id: response._id,
                        getSchemaDefinition: function (): Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, { [x: string]: unknown; }, Document<unknown, {}, FlatRecord<{ [x: string]: unknown; }>, {}> & FlatRecord<{ [x: string]: unknown; }> & Required<{ _id: unknown; }> & { __v: number; }> {
                            throw new Error("Function not implemented.");
                        },
                        status: 0
                    },
                    id: aux.u_id // Cambiado de aux._id a aux.u_id para coincidir con el esquema
                });
            } else { //IF NOT, CREATE A NEW ONE
                await this.authBundleDAO.saveOrUpdate({
                    body: {
                        ref_token: ref_token,
                        u_id: response._id,
                        public_ip: await publicIp.publicIp(),
                        getSchemaDefinition: function (): Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, { [x: string]: unknown; }, Document<unknown, {}, FlatRecord<{ [x: string]: unknown; }>, {}> & FlatRecord<{ [x: string]: unknown; }> & Required<{ _id: unknown; }> & { __v: number; }> {
                            throw new Error("Function not implemented.");
                        },
                        status: 0
                    }
                });
            }

            await this.userDAO.saveOrUpdate({
                body: {
                    access_token: access_token,
                    email: "",
                    username: "",
                    password: "",
                    name: "",
                    surname: "",
                    age: 0,
                    confirmed: false,
                    getSchemaDefinition: function (): Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, { [x: string]: unknown; }, Document<unknown, {}, FlatRecord<{ [x: string]: unknown; }>, {}> & FlatRecord<{ [x: string]: unknown; }> & Required<{ _id: unknown; }> & { __v: number; }> {
                        throw new Error("Function not implemented.");
                    },
                    u_id: "",
                    ref_token: "",
                    created_at: undefined,
                    updated_at: undefined,
                    status: 0
                },
                id: response._id
            });

            response = {
                access_token: access_token,
                status: 200
            };
        } else {
            response = {
                msg: "Unauthorized: Password doesn't match",
                status: 401
            }
        }

        //databaseManager.disconnect();

        return response;
    }
    /**
     * Registers a new user in the system.
     * @returns An object containing the status of the registration.
     */
    public static async registerUser() {
        let response: any;
        let databaseManager: DatabaseManager;
        let bucketManager: BucketManager;

        databaseManager = new DatabaseManager();
        bucketManager = new BucketManager();

        //Create DAO
        this.userDAO = new GenericDAO(UserSchema);

        //Retrieve request body
        this.requestBody = {
            email: AbstractController.metadata("request").body.email,
            username: AbstractController.metadata("request").body.username,
            password: AbstractController.metadata("request").body.password
        }

        try {
            this.requestBody.password = hash(this.requestBody.password);
        } catch (e) {

            if (this.requestBody.password == undefined) {
                response = {
                    msg: "Error: Password required",
                    status: 422
                }
            } else {
                return response;
            }
            return response;
        }

        response = await this.userDAO.saveOrUpdate({
            body: this.requestBody
        });

        if (response.status != 409) {
            let responseAux = await this.userDAO.load({
                body: this.requestBody
            });

            bucketManager.createFolder({ folderPath: responseAux._id + "/" + HomeService.cfg.app + "/" + "public/" });
            bucketManager.createFolder({ folderPath: responseAux._id + "/" + HomeService.cfg.app + "/" + "private/" });
        }

        //databaseManager.disconnect();

        return response;
    }
    /**
     * Destroys the user session, logging the user out.
     * @returns A message indicating the result of the logout operation.
     */
    public static async destroySession() {
        let response: any;
        let databaseManager: DatabaseManager;

        databaseManager = new DatabaseManager();

        //Create DAO
        this.userDAO = new GenericDAO(UserSchema);
        this.authBundleDAO = new GenericDAO(AuthBundleSchema);

        let token = AbstractController.metadata("request").header("px-token");
        let refToken = Object(TokenManager.decode(token)).ref_token;

        response = await this.authBundleDAO.load({
            ref_token: refToken
        });

        if (response._id != undefined) {
            response = await this.authBundleDAO.delete(response._id);

            databaseManager.disconnect();
            return {
                msg: "User logged out successfully",
                status: 200
            }
        } else {
            databaseManager.disconnect();
            return {
                msg: "Couldn't log out. User not logged in",
                status: 404
            }
        }

        
    }
}