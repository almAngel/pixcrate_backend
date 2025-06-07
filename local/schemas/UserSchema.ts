import GenericSchema from "./GenericSchema";
import { Requirements } from "../decorators/Requirements";

export class UserSchema extends GenericSchema {

    constructor() {
        super();
    }

    @Requirements({ required: true, unique: true, type: String })
    public email = "";
    @Requirements({ required: true, unique: true, type: String, trim: true })
    public username = "";
    @Requirements({ type: String, required: true, trim: true })
    public password = "";
    @Requirements({ type: String, trim: true })
    public name: string = "";
    @Requirements({ type: String, trim: true })
    public surname: string = "";
    @Requirements({ type: Number, trim: true })
    public age = 0;
    @Requirements({ type: String })
    public access_token = "";
    @Requirements({ type: Boolean })
    public confirmed = false;

    public getSchemaDefinition() {
        return super.getSchemaDefinition(this);
    }    
}

/**
 * UserSchema interface for user document structure.
 * @property u_id - Unique identifier for the user.
 * @property username - The user's username.
 * @property password - The user's hashed password.
 * @property access_token - The user's access token for authentication.
 * @property ref_token - The user's reference token for session management.
 * @property created_at - Timestamp of user creation.
 * @property updated_at - Timestamp of last update.
 * @property status - Status code or state of the user.
 */
export interface UserSchema {
    u_id: string;
    username: string;
    password: string;
    access_token: string;
    ref_token: string;
    created_at: Date;
    updated_at: Date;
    status: number;
}