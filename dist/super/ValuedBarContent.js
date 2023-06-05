"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValuedBarContent = void 0;
const Note_1 = require("../class/Note");
class ValuedBarContent {
    constructor(params = {}) {
        var _a, _b;
        this.value = (_a = params.value) !== null && _a !== void 0 ? _a : Note_1.DEFAULT_NOTE_VALUE;
        this.dots = (_b = params.dots) !== null && _b !== void 0 ? _b : 0;
    }
    // getters & setters
    set value(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    set dots(dots) {
        this._dots = dots;
    }
    get dots() {
        return this._dots;
    }
    get dottedValue() {
        return this.value + (this.value / 2) * this.dots;
    }
}
exports.ValuedBarContent = ValuedBarContent;
