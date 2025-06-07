// ImageModel provides the Mongoose model for the ImageSchema.
// It is used to interact with image documents in the database.

/**
 * ImageModel is the Mongoose model for ImageSchema documents.
 * Use this model to perform database operations on images.
 */

import { DatabaseManager } from "../../helpers/DatabaseManager";
import { ImageSchema } from "../ImageSchema";

export const Model = new DatabaseManager().getInstance().model(ImageSchema.name.toLowerCase().replace("schema", ""), new ImageSchema().getSchemaDefinition());