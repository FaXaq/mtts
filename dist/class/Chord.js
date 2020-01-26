"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const Note_1 = require("./Note");
const Interval_1 = require("./Interval");
const IntervalHandler_1 = require("../super/IntervalHandler");
const ValuedBarContent_1 = require("../super/ValuedBarContent");
const applyMixins_1 = require("../misc/applyMixins");
const utils_1 = require("../misc/utils");
exports.TRIADS = {
    maj: {
        name: "major",
        intervals: [new Interval_1.Interval("P1"), new Interval_1.Interval("M3"), new Interval_1.Interval("P5")],
        notation: ""
    },
    min: {
        name: "minor",
        intervals: [new Interval_1.Interval("P1"), new Interval_1.Interval("m3"), new Interval_1.Interval("P5")],
        notation: "-"
    },
    aug: {
        name: "augmented",
        intervals: [new Interval_1.Interval("P1"), new Interval_1.Interval("M3"), new Interval_1.Interval("A5")],
        notation: "+"
    },
    dim: {
        name: "diminished",
        intervals: [new Interval_1.Interval("P1"), new Interval_1.Interval("m3"), new Interval_1.Interval("d5")],
        notation: "°"
    },
    sus2: {
        name: "suspended2",
        intervals: [new Interval_1.Interval("P1"), new Interval_1.Interval("M2"), new Interval_1.Interval("P5")],
        notation: "sus2"
    },
    sus4: {
        name: "suspended4",
        intervals: [new Interval_1.Interval("P1"), new Interval_1.Interval("P4"), new Interval_1.Interval("P5")],
        notation: "sus4"
    },
    power: {
        name: "power",
        intervals: [new Interval_1.Interval("P1"), new Interval_1.Interval("P5")],
        notation: "5"
    }
};
exports.EXTENDED_CHORDS = {
    M7: {
        addedTones: [new Interval_1.Interval("M7")],
        name: "major 7",
        notation: "M7",
        extends: exports.TRIADS.maj
    },
    7: {
        addedTones: [new Interval_1.Interval("m7")],
        name: "dominant 7",
        notation: "7",
        extends: exports.TRIADS.maj
    },
    "-7/5b": {
        addedTones: [new Interval_1.Interval("m7")],
        name: "minor 7 flat 5",
        notation: "-7/5b",
        extends: exports.TRIADS.dim
    },
    min7: {
        addedTones: [new Interval_1.Interval("m7")],
        name: "minor 7",
        notation: "-7",
        extends: exports.TRIADS.min
    }
};
class Chord extends ValuedBarContent_1.ValuedBarContent {
    constructor(params = {
        root: new Note_1.Note({
            name: "C"
        }),
        value: Note_1.DEFAULT_NOTE_VALUE
    }) {
        super();
        this._notes = [];
        this._definitions = [];
        this.root = params.root;
        if (params.notes && params.notes.length > 0) {
            this.notes = params.notes;
            this.value = params.value || Note_1.DEFAULT_NOTE_VALUE;
            this.intervals = this.computeIntervals();
        } else {
            this.intervals =
                params.intervals || utils_1.cloneInstanceObjectArray(exports.TRIADS.maj.intervals);
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
        } else {
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
    get _possibleTriads() {
        const triads = [];
        Object.keys(exports.TRIADS).forEach(t => {
            const missingIntervals = [];
            // On intervals from the current chord
            for (let i = 0; i < exports.TRIADS[t].intervals.length; i++) {
                let foundIntervals = this.intervals.filter((interval) => {
                    return Interval_1.Interval.equals(interval, exports.TRIADS[t].intervals[i]);
                });
                if (foundIntervals.length === 0) {
                    missingIntervals.push(exports.TRIADS[t].intervals[i]);
                }
            }
            triads.push(Object.assign({}, exports.TRIADS[t], {
                missingIntervals
            }));
        });
        return triads;
    }
    get notation() {
        // Filter each triad defintion
        let possibleTriads = this._possibleTriads;
        // find a perfect match triad
        let perfectMatchedTriad = possibleTriads.find(p => p.missingIntervals.length === 0);
        if (perfectMatchedTriad) {
            if (perfectMatchedTriad.intervals.length === this.notes.length) {
                this._definitions = possibleTriads;
                return perfectMatchedTriad.notation;
            } else {
                console.log(perfectMatchedTriad);
                // it lacks a few intervals, find them and compute extended chord to find a match
                const possibleExtendedChords = this.possibleExtendedChords(perfectMatchedTriad);
                console.log(possibleExtendedChords);
                return possibleExtendedChords[0].notation;
            }
        } else {
            throw new Error(`No name for this chord yet ${JSON.stringify(this)}`);
        }
    }
    computeIntervals() {
        let intervals = [];
        this.notes.forEach((n) => {
            // for now choosing the first result of interval from semitones
            // TODO: find algorithm to be sure semitone value is not currently in the chord
            let semitonesBetweenNotes = Note_1.Note.getSemitonesBetween(this.root, n);
            let possibleInterval = Interval_1.Interval.fromSemitonesAndValue(semitonesBetweenNotes < 0 ?
                (semitonesBetweenNotes % Note_1.SEMITONES_NUMBER) + Note_1.SEMITONES_NUMBER :
                semitonesBetweenNotes, Note_1.Note.getIndexDifferenceBetween(this.root, n));
            if (possibleInterval !== undefined)
                intervals.push(possibleInterval);
        });
        console.log(intervals);
        return intervals;
    }
    addInterval(interval) {
        this._intervals.push(interval);
        this.notes = this.compute(this.intervals, this.root);
    }
    possibleAddedTones(triad) {
        if (triad.intervals.length === this.intervals.length) {
            return [];
        }
        return this.intervals.filter((i) => {
            for (let j = 0; j < triad.intervals.length; j++) {
                if (Interval_1.Interval.equals(i, triad.intervals[j])) {
                    return false;
                }
            }
            return true;
        });
    }
    possibleExtendedChords(triad) {
        const extendedChords = Chord.extendedChordsIntervals;
        const possibleAddedTones = this.possibleAddedTones(triad);
        return extendedChords.filter(ec => {
            if (ec.extends.name == triad.name) {
                // for each interval in extended chord definition check
                for (let i = 0; i < ec.addedTones.length; i++) {
                    const ECAddedTone = ec.addedTones[i];
                    // if there is only one added tone not found exit
                    let flag = false;
                    for (let j = 0; j < possibleAddedTones.length; j++) {
                        const addedTone = possibleAddedTones[j];
                        if (ECAddedTone.name === addedTone.name) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag === false)
                        return false;
                }
                return true;
            }
            return false;
        });
    }
    static get extendedChordsIntervals() {
        return Object.keys(exports.EXTENDED_CHORDS).map(k => {
            const EXTENDED_CHORD = exports.EXTENDED_CHORDS[k];
            // recursively compute chord, to flatten added tones & initial intervals of chord
            const {
                intervals,
                addedTones
            } = Chord.recursiveExtendedChordCompute(EXTENDED_CHORD);
            return Object.assign({}, EXTENDED_CHORD, {
                intervals,
                addedTones
            });
        });
    }
    static recursiveExtendedChordCompute(chord, addedTones = []) {
        if (chord.intervals) {
            return {
                intervals: chord.intervals,
                addedTones
            };
        }
        return Chord.recursiveExtendedChordCompute(chord.extends, [...chord.addedTones, ...addedTones]);
    }
}
exports.Chord = Chord;
applyMixins_1.applyMixins(Chord, [IntervalHandler_1.IntervalHandler]);