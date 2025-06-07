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