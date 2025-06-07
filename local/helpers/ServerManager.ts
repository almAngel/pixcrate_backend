// ServerManager is a helper class for initializing and managing the Express server instance.
// It sets up CORS, starts the server on the configured port, and provides access to the Express app and configuration.

import express from "express";
import config from "../../config.json";
import cors from "cors";

/**
 * ServerManager handles Express server initialization and configuration.
 *
 * Usage:
 *   const server = new ServerManager();
 *   const app = server.getInstance();
 */
export class ServerManager {
    private instance: any;
    private static readonly cfg = config;

    /**
     * Initializes the Express server, sets up CORS, and starts listening on the configured port.
     */
    constructor() {
        this.instance = express();
        this.instance.use(cors());
        this.instance.listen(process.env.PORT || ServerManager.cfg.default_port, () => {
            console.log("Server initialized at port " + ServerManager.cfg.server_route + ":" + (process.env.PORT || ServerManager.cfg.default_port));
        })
            .on("error", (e: any) => {
                console.log("Error: Couldn't start a new server");
            });
    }

    /**
     * Returns the Express app instance for further configuration or route registration.
     */
    public getInstance() {
        return this.instance;
    }

    /**
     * Returns the default port from the configuration.
     */
    public static getPort() {
        return this.cfg.default_port;
    }

    /**
     * Returns the loaded server configuration object.
     */
    public static config() {
        return this.cfg;
    }
}