import { ImageSchema } from "../schemas/ImageSchema";
import { GenericDAO } from "../schemas/dao/GenericDAO";
import { AuthBundleSchema } from "../schemas/AuthBundleSchema";
import { DatabaseManager } from "../helpers/DatabaseManager";
import { AbstractController } from "../controllers/AbstractController";
import { BucketManager } from "../helpers/BucketManager";
import TokenManager from "../helpers/TokenManager";
import config from "../../config.json";
import { handledSend } from "../helpers/Tools";
import { Schema, Model, DefaultSchemaOptions, Document, FlatRecord } from "mongoose";

// ImageService provides business logic for image-related operations such as upload, retrieval, update, and deletion.
// It is used by ImageController to handle requests and responses for /image endpoints.

/**
 * ImageService contains static methods for image management operations.
 * Use these methods in controllers to implement business logic for image endpoints.
 */
export class ImageService {

    private static requestBody: any;
    private static imageDAO: GenericDAO<ImageSchema>;
    private static authBundleDAO: GenericDAO<AuthBundleSchema>;
    private static readonly cfg = config;

    private constructor() { }

    /**
     * Uploads a new image.
     * 1. Authenticates the user using the provided token.
     * 2. Creates a new image record in the database.
     * 3. Uploads the image file to the storage bucket.
     * 4. Updates the image record with the file URL.
     * 
     * @returns The response containing the status and data of the upload operation.
     */
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
                    visibility: visibility,
                    url: "",
                    getSchemaDefinition: function (): Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, { [x: string]: unknown; }, Document<unknown, {}, FlatRecord<{ [x: string]: unknown; }>, {}> & FlatRecord<{ [x: string]: unknown; }> & Required<{ _id: unknown; }> & { __v: number; }> {
                        throw new Error("Function not implemented.");
                    },
                    status: 0
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

                        const image: ImageSchema = {
                            url: `https://${this.cfg.s3_bucket}.s3.${this.cfg.s3_region}.amazonaws.com/` + url,
                            u_id: 'user123',
                            description: 'Descripción de la imagen',
                            visibility: 'public', // o 'private'
                            getSchemaDefinition: function (): Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, { [x: string]: unknown; }, Document<unknown, {}, FlatRecord<{ [x: string]: unknown; }>, {}> & FlatRecord<{ [x: string]: unknown; }> & Required<{ _id: unknown; }> & { __v: number; }> {
                                throw new Error("Function not implemented.");
                            },
                            status: 0
                        };

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

    /**
     * Retrieves all images for the authenticated user.
     * 1. Authenticates the user using the provided token.
     * 2. Fetches all image records from the database for the user.
     * 
     * @returns An array of image objects containing id, description, visibility, and URL.
     */
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

    /**
     * Retrieves all public images.
     * 1. Authenticates the user using the provided token.
     * 2. Fetches all public image records from the database.
     * 
     * @returns An array of public image objects containing id, description, visibility, and URL.
     */
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

    /**
     * Deletes an image.
     * 1. Authenticates the user using the provided token.
     * 2. Retrieves the image record by ID.
     * 3. Deletes the image file from the storage bucket.
     * 4. Removes the image record from the database.
     * 
     * @returns The response containing the status and data of the delete operation.
     */
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

    /**
     * Updates an existing image's details.
     * 1. Authenticates the user using the provided token.
     * 2. Updates the image record in the database with the provided details.
     * 
     * @returns The response containing the status and data of the update operation.
     */
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
                    visibility: AbstractController.metadata("request").body.visibility,
                    u_id: "",
                    url: "",
                    getSchemaDefinition: function (): Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, { [x: string]: unknown; }, Document<unknown, {}, FlatRecord<{ [x: string]: unknown; }>, {}> & FlatRecord<{ [x: string]: unknown; }> & Required<{ _id: unknown; }> & { __v: number; }> {
                        throw new Error("Function not implemented.");
                    },
                    status: 0
                },
                id: AbstractController.metadata("urlParams").id
            });
        }

        return response;
    }
    

}