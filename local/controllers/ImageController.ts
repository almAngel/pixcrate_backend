
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

    constructor() {
        super();
    }

    @POST({ path: "/new", produces: ContentType.APP_JSON, consumes: ContentType.IMAGE_JPEG, sealed: true })
    public async upload() {
        let response;
        ImageService.upload();
    }

    @GET({ path: "/all", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON, sealed: true })
    public async getAll() {
        let response;
        response = await ImageService.getAllImages();
        handledSend(response);
    }

    @GET({ path: "/all-public", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON, sealed: true })
    public async getAllPublic() {
        let response;
        response = await ImageService.getAllPublicImages();
        handledSend(response);
    }

    @DELETE({ path: "/:id", produces: ContentType.APP_JSON, sealed: true })
    public async delete() {
        let response;
        response = await ImageService.deleteImage();
        handledSend(response);
    }

    @PUT({ path: "/:id", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON, sealed: true })
    public async update() {
        let response;
        response = await ImageService.updateImage();
        handledSend(response);
    }
}