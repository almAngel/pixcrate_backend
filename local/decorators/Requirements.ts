import 'reflect-metadata';

export function Requirements({...args}: {}) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, {
            ...args
        }, target);
    }
}

export function getRequirements(propertyKey: string, target: Object): Object {
    let out = {};
    out = Reflect.getMetadata(propertyKey, target);
    
    return out;
}