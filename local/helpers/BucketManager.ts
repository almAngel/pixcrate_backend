// BucketManager is a helper class for managing AWS S3 buckets and objects (folders/files).
// It provides methods to create folders, upload files, and delete files in an S3 bucket using the AWS SDK.
// The configuration is loaded from config.json and credentials are set up in the constructor.

import aws, { S3 } from "aws-sdk";
import config from "../../config.json";
import { readFileSync } from "fs";
import { handledSend } from "./Tools.js";

/**
 * BucketManager handles AWS S3 operations such as creating folders, uploading, and deleting files.
 *
 * Usage:
 *   const manager = new BucketManager();
 *   manager.uploadFile({ ... });
 *   manager.deleteFile({ ... });
 */
export class BucketManager {
    private instance: aws.S3;
    private static readonly cfg = config;

    /**
     * Initializes the S3 instance and sets credentials/region from config.json.
     */
    constructor() {
        this.instance = new aws.S3({});

        this.instance.config.region = "eu-west-3";

        this.instance.config.update({
            accessKeyId: BucketManager.cfg.s3_access,
            secretAccessKey: BucketManager.cfg.s3_secret,
        });

    }

    /**
     * Creates a folder in the S3 bucket at the specified path (optionally with context).
     * @param folderPath - The base path for the folder.
     * @param context - Optional subfolder or context to append.
     */
    public async createFolder({ folderPath, context }: { folderPath: string; context?: string }) {
        let response: any;
        let finalPath: string;

        finalPath = folderPath;

        if (context) {
            finalPath += ("/" + context)
        }

        this.instance.config.params = {
            Bucket: BucketManager.cfg.s3_bucket
        }

        this.instance.headBucket(
            (err, data) => {
                if (err) throw err;
            }
        );

        this.instance.putObject({
            Bucket: BucketManager.cfg.s3_bucket,
            Key: finalPath,
            ServerSideEncryption: "AES256"
        },
            (err, data) => {
                if (err) throw err;
            });
    }

    /**
     * Uploads a file to the S3 bucket.
     * @param file - The file object (expects .path and .type for images).
     * @param visibility - 'public' or other (sets ACL accordingly).
     * @param url - The S3 key (path) where the file will be stored.
     * @param onSuccess - Optional callback on success.
     * @param onError - Optional callback on error.
     */
    public uploadFile({ file, visibility, url, onSuccess, onError }: { file: any, visibility: string, url: string, onSuccess?: Function, onError?: Function }) {
        let response: any;
        let fileContent;
        let reader: FileReader;

        if (file != undefined) {
            if (file.type == "image/jpeg") {
                let fileContent = readFileSync(file.path);

                this.instance.config.params = {
                    Bucket: BucketManager.cfg.s3_bucket
                }

                this.instance.headBucket(
                    (err, data) => {
                        if (err) throw err;
                    }
                );

                this.instance.putObject({
                    Bucket: BucketManager.cfg.s3_bucket,
                    ContentType: "image/jpeg",
                    Key: url,
                    Body: fileContent,
                    ACL: (visibility == "public") ? "public-read" : "",
                    ServerSideEncryption: "AES256"
                }, (err, data) => {
                    if (err) throw err;
                })
                    .on("httpDone", () => {
                        handledSend({
                            msg: "File uploaded successfully",
                            status: 201
                        });
                        //EXECUTE CALLBACK
                        onSuccess(url);
                    }).on("httpError", () => {
                        handledSend({
                            msg: "Error when uploading file",
                            status: 500
                        });
                        onError();
                    });
            } else {
                handledSend({
                    msg: "Error: Unsupported Media Type",
                    status: 415
                });
                onError();
            }
        }

    }

    /**
     * Deletes a file from the S3 bucket.
     * @param url - The S3 key (path) of the file to delete.
     * @param onSuccess - Optional callback on success.
     * @param onError - Optional callback on error.
     */
    public deleteFile({ url, onSuccess, onError }: { url: string, onSuccess?: Function, onError?: Function }) {
        this.instance.config.params = {
            Bucket: BucketManager.cfg.s3_bucket
        }

        this.instance.headBucket(
            (err, data) => {
                if (err) throw err;
            }
        );

        if (url != undefined) {
            this.instance.deleteObject({
                Bucket: BucketManager.cfg.s3_bucket,
                Key: url
            }, (err, data) => {
                if(err) {
                    throw err;
                } else {
                    onSuccess();
                }
            });
            handledSend({
                msg: "File deleted successfully",
                status: 200
            });  
        } else {
            handledSend({
                msg: "Error: You must specify an url",
                status: 500
            });
            onError();
        }

    }
}