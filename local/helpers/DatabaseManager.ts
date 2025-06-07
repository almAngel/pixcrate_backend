// DatabaseManager is a helper class for managing the MongoDB connection using Mongoose.
// It provides methods to connect, disconnect, and access the database instance and configuration.
// The connection string and options are loaded from config.json.

import config from "../../config.json";
import mongoose from "mongoose";

/**
 * DatabaseManager handles MongoDB connection lifecycle and provides access to the Mongoose instance.
 *
 * Usage:
 *   const db = new DatabaseManager();
 *   db.connect();
 *   db.getInstance();
 */
export class DatabaseManager {
    private instance = mongoose;
    // Connection URL for MongoDB, loaded from config.json
    private static readonly url: string = config.database_route;
    private static readonly date: Date = new Date();

    constructor() {
        this.instance = mongoose;
    }

    /**
     * Connects to the MongoDB database using the configured URL and options.
     * Logs the connection time and date on success.
     */
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

    /**
     * Returns the Mongoose instance for direct access.
     */
    public getInstance() {
        return this.instance;
    }

    /**
     * Returns the loaded configuration object.
     */
    public static getConfig() {
        return config;
    }

    /**
     * Returns the MongoDB connection URL.
     */
    public static getUrl() {
        return this.url;
    }

    /**
     * Performs an action with a connected database, then disconnects.
     * @param action - The function to execute while connected.
     */
    public perform(action: Function) {
        this.connect();
        action();
        this.disconnect();
    }

    /**
     * Disconnects from the MongoDB database.
     */
    public disconnect() {
        this.instance.disconnect();
    }
}