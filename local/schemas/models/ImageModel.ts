import { DatabaseManager } from "../../helpers/DatabaseManager";
import { ImageSchema } from "../ImageSchema";

export const Model = new DatabaseManager().getInstance().model(ImageSchema.name.toLowerCase().replace("schema", ""), new ImageSchema().getSchemaDefinition());