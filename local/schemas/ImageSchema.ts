import GenericSchema from "./GenericSchema";
import { Requirements } from "../decorators/Requirements";

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