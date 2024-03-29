"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pitch = void 0;
class Pitch {
    constructor(params = { value: 4 }) {
        this.value = params.value;
    }
    inc() {
        this.value++;
    }
    dec() {
        this.value--;
    }
    // getters & setters
    get value() {
        return this._value;
    }
    set value(value) {
        if (value > -1) {
            this._value = value;
        }
        else {
            throw new Error(`Trying to set a negative pitch : ${value}`);
        }
    }
}
exports.Pitch = Pitch;
