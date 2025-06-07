import config from "../../config.json";
import mongoose from "mongoose";

export class DatabaseManager {
    private instance = mongoose;
    //private static readonly url: string = config.database_route + ":" + config.database_port + "/" + config.database_name;
    private static readonly url: string = config.database_route;
    private static readonly date: Date = new Date();

    constructor() {
        this.instance = mongoose;
    }

    public connect() {
        this.instance.connect(DatabaseManager.url, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true, 
            useFindAndModify: false 
        }, (err) => {
            if (err) throw err;
            console.log(
                `>>> Connection to selected database made at ${DatabaseManager.date.getHours()}:${DatabaseManager.date.getMinutes()}:${DatabaseManager.date.getSeconds()} on ${DatabaseManager.date.getMonth()}/${DatabaseManager.date.getDay()}/${DatabaseManager.date.getFullYear()}`);
        });
    }

    public getInstance() {
        return this.instance;
    }

    public static getConfig() {
        return config;
    }

    public static getUrl() {
        return this.url;
    }

    public perform(action: Function) {
        this.connect();
        action();
        this.disconnect();
    }

    public disconnect() {
        this.instance.disconnect();
    }

} 