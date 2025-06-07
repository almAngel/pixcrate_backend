import { ImageSchema } from "../schemas/ImageSchema";
import { GenericDAO } from "../schemas/dao/GenericDAO";
import { AuthBundleSchema } from "../schemas/AuthBundleSchema";
import { DatabaseManager } from "../helpers/DatabaseManager";
import { AbstractController } from "../controllers/AbstractController";
import { BucketManager } from "../helpers/BucketManager";
import TokenManager from "../helpers/TokenManager";
import config from "../../config.json";
import { handledSend } from "../helpers/Tools";

export class ImageService {

    private static requestBody: any;
    private static imageDAO: GenericDAO<ImageSchema>;
    private static authBundleDAO: GenericDAO<AuthBundleSchema>;
    private static readonly cfg = config;

    private constructor() { }

    public static async upload() {
        let response: any, responseAux: any;
        let databaseManager: DatabaseManager;
        let bucketManager: BucketManager;

        databaseManager = new DatabaseManager();
        bucketManager = new BucketManager();

        //Create DAO
        this.imageDAO = new GenericDAO(ImageSchema);
        this.authBundleDAO = new GenericDAO(AuthBundleSchema);

        let tokenAux = AbstractController.metadata("request").header("px-token");
        let refToken = Object(TokenManager.decode(tokenAux)).ref_token;

        let file = AbstractController.metadata("request").files["image"];
        let visibility = AbstractController.metadata("request").fields["visibility"];
        let description = AbstractController.metadata("request").fields["description"];

        response = await this.authBundleDAO.load(
            {
                ref_token: refToken
            }
        );

        if (!TokenManager.expired(tokenAux) && response.status != 404) {
            //FIRST, CREATE THE RESOURCE INSIDE OUR DATABASE
            responseAux = await this.imageDAO.saveOrUpdate({
                body: {
                    u_id: response.u_id,
                    description: description,
                    visibility: visibility
                },
                returnResult: true
            });

            //THEN, IF IT'S FINALLY CREATED, UPLOAD OUR FILE
            if (responseAux.status == 201) {
                bucketManager.uploadFile({
                    file: file,
                    visibility: visibility,
                    url: response.u_id + "/" + this.cfg.app + "/" + visibility + "/" + responseAux._id + ".jpg",
                    onSuccess: async (url: string) => {

                        let image = {
                            url: `https://${this.cfg.s3_bucket}.s3.${this.cfg.s3_region}.amazonaws.com/` + url
                        }

                        await this.imageDAO.saveOrUpdate({
                            body: image,
                            id: responseAux._id
                        });
                    },
                    onError: async () => {

                        await this.imageDAO.delete(
                            responseAux._id
                        );
                    }
                });
            }

        }

        return response;
    }

    public static async getAllImages() {
        let response: any, responseAux: any;
        let databaseManager: DatabaseManager;

        databaseManager = new DatabaseManager();

        //Create DAO
        this.imageDAO = new GenericDAO(ImageSchema);
        this.authBundleDAO = new GenericDAO(AuthBundleSchema);

        let tokenAux = AbstractController.metadata("request").header("px-token");
        let refToken = Object(TokenManager.decode(tokenAux)).ref_token;

        response = await this.authBundleDAO.load(
            {
                ref_token: refToken
            }
        );

        if (!TokenManager.expired(tokenAux) && response.status != 404) {
            responseAux = await this.imageDAO.loadGroup(
                {
                    u_id: response.u_id,
                },
            );

        }

        response = [];
        responseAux.forEach((e: any, i: number) => {
            response.push({
                _id: e._id,
                description: e.description,
                visibility: e.visibility,
                url: e.url
            });
        });


        return response;
    }

    public static async getAllPublicImages() {
        let response: any, responseAux: any;
        let databaseManager: DatabaseManager;

        databaseManager = new DatabaseManager();

        //Create DAO
        this.imageDAO = new GenericDAO(ImageSchema);
        this.authBundleDAO = new GenericDAO(AuthBundleSchema);

        let tokenAux = AbstractController.metadata("request").header("px-token");
        let refToken = Object(TokenManager.decode(tokenAux)).ref_token;

        response = await this.authBundleDAO.load(
            {
                ref_token: refToken
            }
        );

        if (!TokenManager.expired(tokenAux) && response.status != 404) {
            responseAux = await this.imageDAO.loadGroup(
                {
                    visibility: "public",
                },
            );

        }

        response = [];
        responseAux.forEach((e: any, i: number) => {
            response.push({
                _id: e._id,
                description: e.description,
                visibility: e.visibility,
                url: e.url
            });
        });


        return response;
    }

    public static async deleteImage() {
        let response: any, responseAux: any;
        let databaseManager: DatabaseManager;
        let bucketManager: BucketManager;

        databaseManager = new DatabaseManager();
        bucketManager = new BucketManager();

        //Create DAO
        this.imageDAO = new GenericDAO(ImageSchema);
        this.authBundleDAO = new GenericDAO(AuthBundleSchema);

        let tokenAux = AbstractController.metadata("request").header("px-token");
        let refToken = Object(TokenManager.decode(tokenAux)).ref_token;
        
        response = await this.authBundleDAO.load(
            {
                ref_token: refToken
            }
        );

        if (!TokenManager.expired(tokenAux) && response.status != 404) {

            responseAux = await this.imageDAO.loadById(
                AbstractController.metadata("urlParams").id
            );

            if (responseAux.status != 404) {
                let preparedUrl = responseAux.url.slice(responseAux.url.indexOf(".com/") + ".com/".length, responseAux.url.length);

                bucketManager.deleteFile({
                    url: preparedUrl,
                    onSuccess: async () => {
                        await this.imageDAO.delete(
                            AbstractController.metadata("urlParams").id
                        );
                    }
                });

            } else {
                response = responseAux;
            }
        }

        return response;
    }

    public static async updateImage() {
        let response: any, responseAux: any;
        let databaseManager: DatabaseManager;

        databaseManager = new DatabaseManager();

        //Create DAO
        this.imageDAO = new GenericDAO(ImageSchema);
        this.authBundleDAO = new GenericDAO(AuthBundleSchema);

        let tokenAux = AbstractController.metadata("request").header("px-token");
        let refToken = Object(TokenManager.decode(tokenAux)).ref_token;
        
        response = await this.authBundleDAO.load(
            {
                ref_token: refToken
            }
        );

        if (!TokenManager.expired(tokenAux) && response.status != 404) {

            response = await this.imageDAO.saveOrUpdate({
                body: {
                    description: AbstractController.metadata("request").body.description,
                    visibility: AbstractController.metadata("request").body.visibility
                },
                id: AbstractController.metadata("urlParams").id
            });
        }

        return response;
    }
    

}