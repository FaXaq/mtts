"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = require("./Note");
const Interval_1 = require("./Interval");
const IntervalHandler_1 = require("../super/IntervalHandler");
const ValuedBarContent_1 = require("../super/ValuedBarContent");
const applyMixins_1 = require("../misc/applyMixins");
const utils_1 = require("../misc/utils");
exports.TRIADS = [
    {
        "name": "major",
        "intervals": [
            new Interval_1.Interval("P1"),
            new Interval_1.Interval("M3"),
            new Interval_1.Interval("P5")
        ],
        "code": "M",
        "notation": ""
    },
    {
        "name": "minor",
        "intervals": [
            new Interval_1.Interval("P1"),
            new Interval_1.Interval("m3"),
            new Interval_1.Interval("P5")
        ],
        "code": "m",
        "notation": "-"
    },
    {
        "name": "augmented",
        "intervals": [
            new Interval_1.Interval("P1"),
            new Interval_1.Interval("M3"),
            new Interval_1.Interval("A5")
        ],
        "code": "aug",
        "notation": "+"
    },
    {
        "name": "diminished",
        "intervals": [
            new Interval_1.Interval("P1"),
            new Interval_1.Interval("m3"),
            new Interval_1.Interval("d5")
        ],
        "code": "dim",
        "notation": "°"
    },
    {
        "name": "suspended2",
        "intervals": [
            new Interval_1.Interval("P1"),
            new Interval_1.Interval("M2"),
            new Interval_1.Interval("P5")
        ],
        "code": "sus2",
        "notation": "sus2"
    },
    {
        "name": "suspended4",
        "intervals": [
            new Interval_1.Interval("P1"),
            new Interval_1.Interval("P4"),
            new Interval_1.Interval("P5")
        ],
        "code": "sus4",
        "notation": "sus4"
    }
];
const ADDED_TONES = [
    {
        "name": "major 7th",
        "intervals": [
            new Interval_1.Interval("M7")
        ],
        "code": "M7",
        "notation": "M7"
    },
    {
        "name": "minor 7th",
        "intervals": [
            new Interval_1.Interval("m7")
        ],
        "code": "m7",
        "notation": "m7"
    }
];
class Chord extends ValuedBarContent_1.ValuedBarContent {
    constructor(params = { root: new Note_1.Note({ name: "C" }), value: Note_1.DEFAULT_NOTE_VALUE }) {
        super();
        this._notes = [];
        this._definitions = [];
        this.root = params.root;
        if (params.notes && params.notes.length > 0) {
            this.notes = params.notes;
            this.value = params.value || Note_1.DEFAULT_NOTE_VALUE;
            this.intervals = this.computeIntervals();
        }
        else {
            this.intervals = params.intervals || utils_1.cloneInstanceObjectArray(exports.TRIADS[0].intervals);
            this.value = params.value || Note_1.DEFAULT_NOTE_VALUE;
            this.notes = this.compute(this.intervals, this.root);
        }
    }
    get root() {
        return this._root;
    }
    set root(root) {
        if (root instanceof Note_1.Note) {
            this._root = root;
        }
        else {
            throw new Error(`Trying to set a root for a chord, with something that is note a Note`);
        }
    }
    get intervals() {
        return this._intervals;
    }
    set intervals(intervals) {
        intervals.forEach(i => {
            if (!(i instanceof Interval_1.Interval)) {
                throw new Error(`Trying to set interval for chords, but ${JSON.stringify(i)} is not an Interval.`);
            }
        });
        this._intervals = intervals;
    }
    set notes(notes) {
        this._notes = notes;
    }
    get notes() {
        return this._notes;
    }
    get name() {
        // Filter each triad defintion
        let possibleTriad = exports.TRIADS.filter((triadDefinition) => {
            // On intervals from the current chord
            for (let i = 0; i < triadDefinition.intervals.length; i++) {
                let foundIntervals = this.intervals.filter((interval) => {
                    return Interval_1.Interval.equals(interval, triadDefinition.intervals[i]);
                });
                if (foundIntervals.length === 0) {
                    return false;
                }
            }
            return true;
        });
        if (possibleTriad.length > 0) {
            this._definitions = possibleTriad;
            return this.root.name + possibleTriad[0].notation;
        }
        throw new Error(`No name for this chord yet ${JSON.stringify(this)}`);
    }
    computeIntervals() {
        let intervals = [];
        this.notes.forEach((n) => {
            // for now choosing the first result of interval from semitones
            // TODO: find algorithm to be sure semitone value is not currently in the chord
            let possibleInterval = Interval_1.Interval.fromSemitonesAndValue(Note_1.Note.getSemitonesBetween(this.root, n), Note_1.Note.getIndexDifferenceBetween(this.root, n));
            if (possibleInterval !== undefined)
                intervals.push(possibleInterval);
        });
        return intervals;
    }
    addInterval(interval) {
        this._intervals.push(interval);
        this.notes = this.compute(this.intervals, this.root);
    }
}
exports.Chord = Chord;
applyMixins_1.applyMixins(Chord, [IntervalHandler_1.IntervalHandler]);
