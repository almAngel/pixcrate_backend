import GenericSchema from "./GenericSchema";
import { Requirements } from "../decorators/Requirements";

export class AuthBundleSchema extends GenericSchema {

    constructor() {
        super();
    }

    @Requirements({ required: true, unique: true, type: String })
    public u_id = ""; //MUST HAVE A VALUE
    @Requirements({ required: true, type: String })
    public public_ip = ""; //MUST HAVE A VALUE
    @Requirements({ required: true, unique: true, type: String })
    public ref_token = ""; //MUST HAVE A VALUE

    public getSchemaDefinition() {
        return super.getSchemaDefinition(this);
    }    
}