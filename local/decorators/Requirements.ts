// Requirements decorator allows attaching custom metadata to class methods using reflect-metadata.
// Useful for specifying requirements or constraints for endpoints (e.g., permissions, validation rules).

import 'reflect-metadata';

/**
 * Decorator to define requirements metadata for a method.
 * @param args - An object with requirement properties to attach as metadata.
 */
export function Requirements({ ...args }: {}) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(propertyKey, {
            ...args
        }, target);
    }
}

/**
 * Retrieves requirements metadata for a given method/property on a target object.
 * @param propertyKey - The property or method name.
 * @param target - The target object (usually the class prototype).
 * @returns The requirements metadata object, or undefined if not set.
 */
export function getRequirements(propertyKey: string, target: Object): Object {
    let out = {};
    out = Reflect.getMetadata(propertyKey, target);
    return out;
}