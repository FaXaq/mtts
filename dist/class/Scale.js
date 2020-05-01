"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = require("./Note");
const Interval_1 = require("./Interval");
const IntervalHandler_1 = require("../super/IntervalHandler");
const applyMixins_1 = require("../misc/applyMixins");
const Chord_1 = require("./Chord");
exports.SCALES = {
    MAJOR: {
        name: 'major',
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
    MINOR: {
        name: 'minor',
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
    constructor(params = {}) {
        var _a, _b, _c;
        this._notes = [];
        this._intervals = [];
        const key = (_a = params.key) !== null && _a !== void 0 ? _a : new Note_1.Note({ name: 'C' });
        const intervals = (_b = params.intervals) !== null && _b !== void 0 ? _b : [];
        const name = (_c = params.name) !== null && _c !== void 0 ? _c : 'MAJOR';
        this.key = key;
        if (params.intervals !== undefined && Array.isArray(intervals) && intervals.length > 0) {
            this.intervals = intervals;
        }
        else if (exports.SCALES[name] !== undefined) {
            console.warn('Scale built from name, not from provided intervals.');
            this.intervals = exports.SCALES[name].intervals;
        }
        else {
            throw new Error("Didn't provide a valid array of intervals or a valid scale name. Cannot initialize scale.");
        }
    }
    get intervals() {
        return this._intervals;
    }
    set intervals(intervals) {
        if (!Array.isArray(intervals) || !intervals.every(i => i instanceof Interval_1.Interval)) {
            throw new Error(`Cannot assign ${JSON.stringify(intervals)} as scale intervals.`);
        }
        this._intervals = intervals;
        // each time intevals changes, compute notes of the scale
        this.notes = this.compute(this.intervals, this.key);
    }
    get name() {
        const filteredScales = Object.keys(exports.SCALES).filter(s => {
            const scale = exports.SCALES[s];
            if (scale.intervals.length === this.intervals.length) {
                return scale.intervals.every((v, i) => v.name === this.intervals[i].name);
            }
            else {
                return false;
            }
        });
        if (filteredScales.length === 0) {
            throw new Error('Cannot find a name for this scale.');
        }
        return exports.SCALES[filteredScales[0]].name;
    }
    set name(name) {
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
    // Return all 7th chords from the scale if it is diatonic
    get scaleChords() {
        const chords = [];
        if (this.intervals.length === 7) {
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
        }
        else {
            console.warn('Cannot compute scale chords yet.');
        }
        return chords;
    }
}
exports.Scale = Scale;
applyMixins_1.applyMixins(Scale, [IntervalHandler_1.IntervalHandler]);
