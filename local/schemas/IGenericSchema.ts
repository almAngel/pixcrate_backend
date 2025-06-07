import { Schema } from "mongoose";

/**
 * IGenericSchema interface for generic document structure.
 * @property u_id - Unique identifier for the document.
 * @property status - Status code or state of the document.
 */
export default interface IGenericSchema {
    u_id: string;
    status: number;
    getSchemaDefinition(o: Object): Schema;
}