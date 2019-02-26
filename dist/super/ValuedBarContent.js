"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = require("../class/Note");
class ValuedBarContent {
    constructor(params = {}) {
        this.value = params.value || Note_1.DEFAULT_NOTE_VALUE;
        this.dots = params.dots || 0;
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
