"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pitch {
    constructor(pitch = 4) {
        this.value = pitch;
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
