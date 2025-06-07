import { Schema } from "mongoose";
import IGenericSchema from "./IGenericSchema";
import { getRequirements } from "../decorators/Requirements";

export default class GenericSchema implements IGenericSchema  {

    constructor() {}

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