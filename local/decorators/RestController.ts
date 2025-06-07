// RestController decorator registers a class as a REST controller with a given root path.
// It attaches the root path as metadata and invokes each method (except the constructor) with the root path as argument.
// This enables automatic route registration and configuration for all controller methods.

/**
 * Decorator to mark a class as a REST controller and set its root path.
 * @param rootPath - The base path for all routes in this controller (e.g., '/users').
 */
export function RestController(rootPath: string = "") {
    return function (constructor: Function) {
        // Create an instance to access the prototype and its methods
        let instance = Reflect.construct(constructor, []);
        let prototype = Object.getPrototypeOf(instance);
        let methods = Object.getOwnPropertyNames(prototype);
        // Store the root path as metadata for later use
        Reflect.defineMetadata("rootPath", rootPath, Object.getPrototypeOf(constructor.prototype));
        // For each method (except constructor), invoke it with the root path
        methods.forEach((e) => {
            if (e != "constructor") {
                var func: Function = prototype[e];
                Reflect.apply(func, null, [rootPath]);
            }
        });
    }
}