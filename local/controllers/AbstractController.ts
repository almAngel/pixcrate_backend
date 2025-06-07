// AbstractController provides base static methods for handling metadata on controllers using Reflect Metadata API.
// It is intended to be extended by other controllers to share common metadata logic.

export class AbstractController {
    // Constructor does nothing by default, but allows for future extensibility.
    constructor() {}

    /**
     * Retrieves metadata associated with the given property name from the controller prototype.
     * Throws an error if the metadata property does not exist.
     * @param prop - The metadata property name to retrieve.
     * @returns The value of the metadata property.
     */
    public static metadata(prop: string) {
        let data: any;
        if (Reflect.getMetadata(prop, AbstractController.prototype)) {
            data = Reflect.getMetadata(prop, AbstractController.prototype);
        } else {
            // If the metadata property does not exist, throw an error with details.
            let err = new Error(`This metadata property '${prop}' doesn't exist inside ` + Reflect.getMetadata("rootPath", AbstractController.prototype));
            Error.captureStackTrace(err, this.metadata);
            throw err;
        }
        return data;
    }

    /**
     * Sets metadata for the given property name on the controller prototype.
     * @param prop - The metadata property name to set.
     * @param value - The value to associate with the property.
     */
    public static setMetadata(prop: string, value: any) {
        Reflect.defineMetadata(prop, value, AbstractController.prototype);
    }
}