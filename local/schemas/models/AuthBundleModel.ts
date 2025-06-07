import { DatabaseManager } from "../../helpers/DatabaseManager";
import { AuthBundleSchema } from "../AuthBundleSchema";
import { App } from "../../../bootstrapper";


export const Model = new DatabaseManager().getInstance().model(AuthBundleSchema.name.toLowerCase().replace("schema", ""), new AuthBundleSchema().getSchemaDefinition());