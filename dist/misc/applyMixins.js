"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// see https://www.typescriptlang.org/docs/handbook/mixins.html
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
exports.applyMixins = applyMixins;
