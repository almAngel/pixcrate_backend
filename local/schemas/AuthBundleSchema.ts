import GenericSchema from "./GenericSchema";
import { Requirements } from "../decorators/Requirements";

/**
 * AuthBundleSchema defines the structure for authentication bundles stored in the database.
 * This schema is used to associate public IPs and reference tokens for authentication and token renewal.
 *
 * @property public_ip - The public IP address associated with the bundle.
 * @property ref_token - The reference token for the user/session.
 * @property u_id - The unique identifier for the bundle.
 * @property status - The status code or state of the bundle.
 */
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