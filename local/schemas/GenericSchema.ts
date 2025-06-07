import { Schema } from "mongoose";
import IGenericSchema from "./IGenericSchema";
import { getRequirements } from "../decorators/Requirements";

/**
 * GenericSchema defines a base structure for documents stored in the database.
 * It can be extended or used as a base for more specific schemas.
 *
 * GenericSchema interface for base document structure.
 * @property u_id - Unique identifier for the document.
 * @property status - Status code or state of the document.
 */
export default class GenericSchema implements IGenericSchema  {

    constructor() {}
    u_id: string = "";
    status: number = 0;

    getSchemaDefinition(o: Object): Schema {
        let props: string[] = Object.keys(o);

        var sd = {};

        for (let i = 0; i < props.length; i++) {

            let type: any = (typeof Object(o)[props[i]]);
            if (getRequirements(props[i], o) != undefined) {
                Object.defineProperty(sd, props[i], {
                    writable: true,
                    value: getRequirements(props[i], o),
                    enumerable: true,
                });
            } else {
                Object.defineProperty(sd, props[i], {
                    writable: true,
                    value: type,
                    enumerable: true,
                });
            }
        }

        return new Schema(sd, { versionKey: false });
    }
}