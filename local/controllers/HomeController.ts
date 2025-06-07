import { AbstractController } from "./AbstractController";
import { ContentType } from "../enum/ContentType";
import HomeService from "../services/HomeService";
import { handledSend } from "../helpers/Tools";
import { GET } from "../decorators/httpverbs/GET";
import { POST } from "../decorators/httpverbs/POST";
import { RestController } from "../decorators/RestController";
import { DELETE } from "../decorators/httpverbs/DELETE";

@RestController("/home")
export class HomeController extends AbstractController {

    constructor() {
        super();
    }
    
    @POST({ path: "/access", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON })
    public async getAccessToken() {
        let response;
        response = await HomeService.getAccessToken();
        
        handledSend(response);
    }

    @POST({ path: "/new", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON })
    public async register() {
        let response;
        
        response = await HomeService.registerUser();

        handledSend(response);
    }

    @DELETE({ path: "/end", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON, sealed: true })
    public async logout() {
        let response;

        response = await HomeService.destroySession();

        handledSend(response);
    }
}