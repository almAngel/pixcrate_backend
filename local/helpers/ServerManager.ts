import express from "express";
import config from "../../config.json";
import bodyParser from "body-parser";
import cors from "cors";
import formidable from "express-formidable";

export class ServerManager {
    private instance: any;
    private static readonly cfg = config;

    constructor() {
        this.instance = express();
        this.instance.use(cors());

        this.instance.listen(process.env.PORT || ServerManager.cfg.default_port, () => {
            console.log("Server initialized at port " + ServerManager.cfg.server_route + ":" + process.env.PORT || ServerManager.cfg.default_port);
        })
            .on("error", (e: any) => {
                console.log("Error: Couldn't start a new server");
            });
    }

    public getInstance() {
        return this.instance;
    };

    public static getPort() {
        return this.cfg.default_port;
    }

    public static config() {
        return this.cfg;
    }
}

/*
function errorHandler(err: any, req: any, res: any, next: any) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
}
*/