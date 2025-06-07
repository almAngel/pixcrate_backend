// HomeController handles the main endpoints for the /home route, including authentication and session management.
// It uses decorators to define REST endpoints and HTTP verbs, and delegates business logic to HomeService.

import { AbstractController } from "./AbstractController";
import { ContentType } from "../enum/ContentType";
import HomeService from "../services/HomeService";
import { handledSend } from "../helpers/Tools";
import { POST } from "../decorators/httpverbs/POST";
import { RestController } from "../decorators/RestController";
import { DELETE } from "../decorators/httpverbs/DELETE";

@RestController("/home")
export class HomeController extends AbstractController {
    // Initializes the HomeController and calls the parent constructor.
    constructor() {
        super();
    }
    
    /**
     * POST /home/access
     * Endpoint to obtain an access token for the user.
     * Consumes and produces JSON.
     */
    @POST({ path: "/access", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON })
    public async getAccessToken() {
        let response;
        response = await HomeService.getAccessToken();
        handledSend(response);
    }

    /**
     * POST /home/new
     * Endpoint to register a new user.
     * Consumes and produces JSON.
     */
    @POST({ path: "/new", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON })
    public async register() {
        let response;
        response = await HomeService.registerUser();
        handledSend(response);
    }

    /**
     * DELETE /home/end
     * Endpoint to log out and destroy the user session.
     * Consumes and produces JSON. Marked as sealed (requires authentication).
     */
    @DELETE({ path: "/end", produces: ContentType.APP_JSON, consumes: ContentType.APP_JSON, sealed: true })
    public async logout() {
        let response;
        response = await HomeService.destroySession();
        handledSend(response);
    }
}