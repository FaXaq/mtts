"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
exports.SCALES = {
    "major": {
        "intervals": ["P1", "M2", "M3", "P4", "P5", "M6", "M7"]
    },
    "minor": {
        "intervals": ["P1", "M2", "m3", "P4", "P5", "M6", "m7"]
    }
};
class Scale {
    constructor(name = "major", key = new __1.Note("C")) {
        this._notes = {};
        this.name = name;
        this.key = key;
        this.compute();
    }
    compute() {
        let scaleIntervals = exports.SCALES[this.name].intervals;
        for (let i = 0; i < scaleIntervals.length; i++) {
            let intervalValue = __1.Interval.getValue(scaleIntervals[i]);
        }
    }
    addNote(intervalValue, note) {
        this._notes[intervalValue] = note;
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
}
exports.Scale = Scale;
