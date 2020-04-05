"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = require("./Note");
const Interval_1 = require("./Interval");
const IntervalHandler_1 = require("../super/IntervalHandler");
const applyMixins_1 = require("../misc/applyMixins");
const Chord_1 = require("./Chord");
exports.SCALES = {
    major: {
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('M7')
        ]
    },
    minor: {
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('m7')
        ]
    }
};
class Scale {
    constructor(params = { key: new Note_1.Note({ name: 'C' }) }) {
        var _a;
        this._notes = [];
        this.name = (_a = params.name) !== null && _a !== void 0 ? _a : 'major';
        this.key = params.key;
        this.notes = this.compute(exports.SCALES[this.name].intervals, this.key);
    }
    get name() {
        return this._name;
    }
    set name(name) {
        if (exports.SCALES[name] !== undefined) {
            this._name = name;
        }
        else {
            throw new Error(`Couldn't create scale ${name}. Available scales are "${Object.keys(exports.SCALES).join(', ')}"`);
        }
    }
    get key() {
        return this._key;
    }
    set key(note) {
        this._key = note;
    }
    set notes(notes) {
        this._notes = notes;
    }
    get notes() {
        return this._notes;
    }
    // Return all 7th chords from the scale
    get scaleChords() {
        const chords = [];
        for (let i = 0; i < this.notes.length; i++) {
            chords.push(new Chord_1.Chord({
                root: this.notes[i],
                notes: [
                    this.notes[i],
                    this.notes[(i + 2) % this.notes.length],
                    this.notes[(i + 4) % this.notes.length],
                    this.notes[(i + 6) % this.notes.length] // 7th
                ]
            }));
        }
        return chords;
    }
}
exports.Scale = Scale;
applyMixins_1.applyMixins(Scale, [IntervalHandler_1.IntervalHandler]);
