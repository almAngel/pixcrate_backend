
export function RestController(rootPath: string = "") {
    return function (constructor: Function) {
        let instance = Reflect.construct(constructor, []);
        let prototype = Object.getPrototypeOf(instance);
        let methods = Object.getOwnPropertyNames(prototype);
        
        Reflect.defineMetadata("rootPath", rootPath, Object.getPrototypeOf(constructor.prototype));

        methods.forEach((e) => {
            
            if (e != "constructor") {
                var func: Function = prototype[e];
                Reflect.apply(func, null, [rootPath]);
            }
        });
        
    }
}