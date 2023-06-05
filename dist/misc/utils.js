"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneInstanceObjectArray = exports.cloneObjectArray = exports.cloneInstanceObject = exports.cloneObject = exports.cloneArray = void 0;
function cloneArray(array) {
    return Array.from(array);
}
exports.cloneArray = cloneArray;
function cloneObject(object) {
    return Object.assign({}, object);
}
exports.cloneObject = cloneObject;
function cloneInstanceObject(instanciableObject) {
    // see https://stackoverflow.com/questions/16024940/how-do-i-clone-a-javascript-class-instance/16025595#16025595
    return Object.assign(Object.create(Object.getPrototypeOf(instanciableObject)), instanciableObject);
}
exports.cloneInstanceObject = cloneInstanceObject;
function cloneObjectArray(objectArray) {
    return Array.from(objectArray, (object) => {
        return cloneObject(object);
    });
}
exports.cloneObjectArray = cloneObjectArray;
function cloneInstanceObjectArray(instanceObjectArray) {
    return Array.from(instanceObjectArray, (instanceObject) => {
        return cloneInstanceObject(instanceObject);
    });
}
exports.cloneInstanceObjectArray = cloneInstanceObjectArray;
