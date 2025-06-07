// UserModel provides the Mongoose model for the UserSchema.
// It is used to interact with user documents in the database.

/**
 * UserModel is the Mongoose model for UserSchema documents.
 * Use this model to perform database operations on users.
 */

import { DatabaseManager } from "../../helpers/DatabaseManager";
import { UserSchema } from "../UserSchema";

export const Model = new DatabaseManager().getInstance().model(UserSchema.name.toLowerCase().replace("schema", ""), new UserSchema().getSchemaDefinition());