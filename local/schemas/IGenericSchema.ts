import { Schema } from "mongoose";

export default interface IGenericSchema {
    getSchemaDefinition(o: Object): Schema;
}