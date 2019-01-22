"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const IntervalHandler_1 = require("../super/IntervalHandler");
exports.SCALES = {
    "major": {
        "intervals": ["P1", "M2", "M3", "P4", "P5", "M6", "M7"]
    },
    "minor": {
        "intervals": ["P1", "M2", "m3", "P4", "P5", "M6", "m7"]
    }
};
class Scale extends IntervalHandler_1.IntervalHandler {
    constructor(params = { key: new __1.Note({ name: "C" }) }) {
        super();
        this.name = params.name || "major";
        this.key = params.key;
        this.compute(exports.SCALES[this.name].intervals, this.key);
    }
    get name() {
        return this._name;
    }
    set name(name) {
        if (exports.SCALES[name]) {
            this._name = name;
        }
        else {
            throw new Error(`Couldn't create scale ${name}. Available scales are "${Object.keys(exports.SCALES)}"`);
        }
    }
    get key() {
        return this._key;
    }
    set key(note) {
        this._key = note;
    }
    get notes() {
        return this._notes;
    }
}
exports.Scale = Scale;
