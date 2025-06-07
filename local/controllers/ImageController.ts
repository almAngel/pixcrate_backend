// ImageController manages endpoints for image operations such as upload, retrieval, update, and deletion.
// It uses REST decorators to define HTTP endpoints and delegates business logic to ImageService.

import { AbstractController } from "./AbstractController";
import { ContentType } from "../enum/ContentType";
import { handledSend } from "../helpers/Tools";
import { GET } from "../decorators/httpverbs/GET";
import { POST } from "../decorators/httpverbs/POST";
import { RestController } from "../decorators/RestController";
import { ImageService } from "../services/ImageService";
import { DELETE } from "../decorators/httpverbs/DELETE";
import { PUT } from "../decorators/httpverbs/PUT";

@RestController("/image")
export class ImageController extends AbstractController {
    // Initializes the ImageController and calls the parent constructor.
    constructor() {
        super();
    }

    /**
     * POST /image/new
     * Endpoint to upload a new image. Consumes JPEG images and produces JSON.
     * Requires authentication (sealed).
     */
    @POST({ path: "/new", produces: ContentType.APP_JSON, consumes: ContentType.IMAGE_JPEG, sealed: true })
    public async upload() {
        let response;
        ImageService.upload();
    }

    /**
     * GET /image/all
     * Endpoint to retrieve all images for the authenticated user. Produces JSON.
     * Requires authentication (sealed).
     */
    @GET({ path: "/all", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON, sealed: true })
    public async getAll() {
        let response;
        response = await ImageService.getAllImages();
        handledSend(response);
    }

    /**
     * GET /image/all-public
     * Endpoint to retrieve all public images. Produces JSON.
     * Requires authentication (sealed).
     */
    @GET({ path: "/all-public", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON, sealed: true })
    public async getAllPublic() {
        let response;
        response = await ImageService.getAllPublicImages();
        handledSend(response);
    }

    /**
     * DELETE /image/:id
     * Endpoint to delete an image by its ID. Produces JSON.
     * Requires authentication (sealed).
     */
    @DELETE({ path: "/:id", produces: ContentType.APP_JSON, sealed: true })
    public async delete() {
        let response;
        response = await ImageService.deleteImage();
        handledSend(response);
    }

    /**
     * PUT /image/:id
     * Endpoint to update an image by its ID. Consumes and produces JSON.
     * Requires authentication (sealed).
     */
    @PUT({ path: "/:id", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON, sealed: true })
    public async update() {
        let response;
        response = await ImageService.updateImage();
        handledSend(response);
    }
}