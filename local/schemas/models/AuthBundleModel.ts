// AuthBundleModel provides the Mongoose model for the AuthBundleSchema.
// It is used to interact with authentication bundle documents in the database.

/**
 * AuthBundleModel is the Mongoose model for AuthBundleSchema documents.
 * Use this model to perform database operations on authentication bundles.
 */

import { DatabaseManager } from "../../helpers/DatabaseManager";
import { AuthBundleSchema } from "../AuthBundleSchema";
import { App } from "../../../bootstrapper";


export const Model = new DatabaseManager().getInstance().model(AuthBundleSchema.name.toLowerCase().replace("schema", ""), new AuthBundleSchema().getSchemaDefinition());