"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = require("./Note");
const Interval_1 = require("./Interval");
const IntervalHandler_1 = require("../super/IntervalHandler");
const ValuedBarContent_1 = require("../super/ValuedBarContent");
const applyMixins_1 = require("../misc/applyMixins");
const utils_1 = require("../misc/utils");
exports.CHORDS = [
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
        "name": "major 7th",
        "intervals": [
            new Interval_1.Interval("P1"),
            new Interval_1.Interval("M3"),
            new Interval_1.Interval("P5"),
            new Interval_1.Interval("M7")
        ],
        "code": "M7",
        "notation": "M7"
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
            this.intervals = params.intervals || utils_1.cloneInstanceObjectArray(exports.CHORDS[0].intervals);
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
        // For each chord defintion
        let possibleChordDefinitions = exports.CHORDS.filter((chordDefinition) => {
            // check if every chord instance interval
            return this.intervals.every((chordInterval) => {
                // is in the chord definition
                return chordDefinition.intervals.filter((interval) => {
                    return Interval_1.Interval.equals(interval, chordInterval);
                }).length > 0;
            });
        });
        if (possibleChordDefinitions.length > 0) {
            this._definitions = possibleChordDefinitions;
            return this.root.name + possibleChordDefinitions[0].notation;
        }
        throw new Error(`No name for this chord yet ${JSON.stringify(this)}`);
    }
    computeIntervals() {
        let intervals = [];
        this.notes.forEach((n) => {
            // for now choosing the first result of interval from semitones
            // TODO: find algorithm to be sure semitone value is not currently in the chord
            intervals.push(Interval_1.Interval.fromSemitones((Note_1.Note.getSemitonesBetween(this.root, n) + Note_1.SEMITONES_NUMBER) % Note_1.SEMITONES_NUMBER)[0]);
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
