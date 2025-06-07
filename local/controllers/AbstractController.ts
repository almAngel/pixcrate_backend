export class AbstractController {

    constructor() {}

    public static metadata(prop: string) {
        let data: any;
        
        if(Reflect.getMetadata(prop, AbstractController.prototype)){
            data = Reflect.getMetadata(prop, AbstractController.prototype);
        } else {
            let err = new Error(`This metadata property '${prop}' doesn't exist inside ` + Reflect.getMetadata("rootPath", AbstractController.prototype));
            Error.captureStackTrace(err, this.metadata);
            throw err;
        }
        return data;
    }

    public static setMetadata(prop: string, value: any) {
        Reflect.defineMetadata(prop, value, AbstractController.prototype);
    }
}