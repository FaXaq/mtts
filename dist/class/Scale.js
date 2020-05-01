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
        mode: 'ionian',
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
        mode: 'aeolian',
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
        var _a, _b, _c, _d;
        this._notes = [];
        this._intervals = [];
        const key = (_a = params.key) !== null && _a !== void 0 ? _a : new Note_1.Note({ name: 'C' });
        const intervals = (_b = params.intervals) !== null && _b !== void 0 ? _b : [];
        const name = (_c = params.name) !== null && _c !== void 0 ? _c : 'major';
        const mode = (_d = params.mode) !== null && _d !== void 0 ? _d : '';
        this.key = key;
        if (params.intervals !== undefined && Array.isArray(intervals) && intervals.length > 0) {
            this.intervals = intervals;
        }
        else if (mode !== '') {
            this.mode = mode;
        }
        else {
            this.name = name;
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
        const definitions = Scale.getDefintionsFromIntervals(this.intervals);
        return definitions.length > 0 ? definitions[0].name : '';
    }
    set name(name) {
        const definitionName = Object.keys(exports.SCALES).find(s => exports.SCALES[s].name === name);
        if (definitionName !== undefined) {
            this.intervals = exports.SCALES[definitionName].intervals;
        }
        else {
            throw new Error(`Couldn't find a scale definition with that name : ${name}.`);
        }
    }
    get mode() {
        var _a;
        const definitions = Scale.getDefintionsFromIntervals(this.intervals);
        return definitions.length > 0 ? (_a = definitions[0].mode) !== null && _a !== void 0 ? _a : '' : '';
    }
    set mode(mode) {
        const definitionName = Object.keys(exports.SCALES).find(s => exports.SCALES[s].mode === mode);
        if (definitionName !== undefined) {
            this.intervals = exports.SCALES[definitionName].intervals;
        }
        else {
            throw new Error(`Couldn't find a scale definition with that mode : ${mode}.`);
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
    static getDefintionsFromIntervals(intervals) {
        return Object.keys(exports.SCALES).filter(s => {
            const scale = exports.SCALES[s];
            if (scale.intervals.length === intervals.length) {
                return scale.intervals.every((v, i) => v.name === intervals[i].name);
            }
            else {
                return false;
            }
        }).map(n => exports.SCALES[n]);
    }
}
exports.Scale = Scale;
applyMixins_1.applyMixins(Scale, [IntervalHandler_1.IntervalHandler]);
