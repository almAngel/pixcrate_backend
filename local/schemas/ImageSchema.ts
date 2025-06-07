import GenericSchema from "./GenericSchema";
import { Requirements } from "../decorators/Requirements";


// ImageSchema defines the structure for image documents stored in the database.
// It includes metadata such as URL, owner, visibility, and timestamps.

/**
 * ImageSchema interface for image document structure.
 * @property u_id - Unique identifier for the image.
 * @property url - The URL or S3 key of the image.
 * @property owner - The user ID of the image owner.
 * @property visibility - Visibility status (e.g., 'public', 'private').
 * @property created_at - Timestamp of image creation.
 * @property updated_at - Timestamp of last update.
 * @property status - Status code or state of the image.
 */
export class ImageSchema extends GenericSchema {

    constructor() {
        super();
    }
    
    @Requirements({ type: String })
    public u_id = ""; //MUST HAVE A VALUE
    @Requirements({ type: String, trim: true })
    public url = "";
    @Requirements({ required: true, type: String })
    public description = "";
    @Requirements({ required: true, type: String, trim: true })
    public visibility = "";

    public getSchemaDefinition() {
        return super.getSchemaDefinition(this);
    }    
}