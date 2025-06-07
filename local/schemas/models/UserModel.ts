import { DatabaseManager } from "../../helpers/DatabaseManager";
import { UserSchema } from "../UserSchema";

export const Model = new DatabaseManager().getInstance().model(UserSchema.name.toLowerCase().replace("schema", ""), new UserSchema().getSchemaDefinition());