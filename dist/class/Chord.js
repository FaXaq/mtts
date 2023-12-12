"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chord = exports.COMPUTED_EXTENDED_CHORDS = exports.EXTENDED_CHORDS = exports.TRIADS = void 0;
const Note_1 = require("./Note");
const Interval_1 = require("./Interval");
const IntervalHandler_1 = require("../super/IntervalHandler");
const ValuedBarContent_1 = require("../super/ValuedBarContent");
const applyMixins_1 = require("../misc/applyMixins");
const utils_1 = require("../misc/utils");
exports.TRIADS = {
    maj: {
        name: 'major',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('M3'), new Interval_1.Interval('P5')],
        notation: ''
    },
    min: {
        name: 'minor',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('m3'), new Interval_1.Interval('P5')],
        notation: '-'
    },
    aug: {
        name: 'augmented',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('M3'), new Interval_1.Interval('A5')],
        notation: '+'
    },
    dim: {
        name: 'diminished',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('m3'), new Interval_1.Interval('d5')],
        notation: '°'
    },
    sus2: {
        name: 'suspended2',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('M2'), new Interval_1.Interval('P5')],
        notation: 'sus2'
    },
    sus4: {
        name: 'suspended4',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('P4'), new Interval_1.Interval('P5')],
        notation: 'sus4'
    },
    power: {
        name: 'power',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('P5')],
        notation: '5'
    }
};
exports.EXTENDED_CHORDS = {
    M7: {
        addedTones: [new Interval_1.Interval('M7')],
        name: 'major 7',
        notation: 'M7',
        extends: exports.TRIADS.maj
    },
    7: {
        addedTones: [new Interval_1.Interval('m7')],
        name: 'dominant 7',
        notation: '7',
        extends: exports.TRIADS.maj
    },
    '-7/5b': {
        addedTones: [new Interval_1.Interval('m7')],
        name: 'minor 7 flat 5',
        notation: '-7/5b',
        extends: exports.TRIADS.dim
    },
    m7: {
        addedTones: [new Interval_1.Interval('m7')],
        name: 'minor 7',
        notation: '-7',
        extends: exports.TRIADS.min
    },
    '7sus4': {
        addedTones: [new Interval_1.Interval('m7')],
        name: 'dominant 7 sus 4',
        notation: '7sus4',
        extends: exports.TRIADS.sus4
    },
    d7: {
        addedTones: [new Interval_1.Interval('d7')],
        name: 'diminished 7',
        notation: '°7',
        extends: exports.TRIADS.dim
    },
    mM7: {
        addedTones: [new Interval_1.Interval('M7')],
        name: 'minor major 7',
        notation: 'mM7',
        extends: exports.TRIADS.min
    },
    9: {
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9')],
        name: '7(9)',
        notation: '9',
        extends: exports.TRIADS.maj
    },
    M9: {
        addedTones: [new Interval_1.Interval('M7'), new Interval_1.Interval('M9')],
        name: 'M7(9)',
        notation: 'M9',
        extends: exports.TRIADS.maj
    },
    min9: {
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9')],
        name: '-7(9)',
        notation: '-9',
        extends: exports.TRIADS.min
    },
    11: {
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11')],
        name: '7(11)',
        notation: '11',
        extends: exports.TRIADS.maj
    },
    M11: {
        addedTones: [new Interval_1.Interval('M7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11')],
        name: 'M7(11)',
        notation: 'M11',
        extends: exports.TRIADS.maj
    },
    m11: {
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11')],
        name: '-7(11)',
        notation: '-11',
        extends: exports.TRIADS.min
    },
    13: {
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11'), new Interval_1.Interval('M13')],
        name: '7(13)',
        notation: '13',
        extends: exports.TRIADS.maj
    },
    M13: {
        addedTones: [new Interval_1.Interval('M7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11'), new Interval_1.Interval('M13')],
        name: 'M7(13)',
        notation: 'M13',
        extends: exports.TRIADS.maj
    },
    m13: {
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11'), new Interval_1.Interval('M13')],
        name: '-7(13)',
        notation: '-13',
        extends: exports.TRIADS.min
    },
    6: {
        addedTones: [new Interval_1.Interval('M6')],
        name: 'major 6',
        notation: '6',
        extends: exports.TRIADS.maj
    },
    min6: {
        addedTones: [new Interval_1.Interval('M6')],
        name: 'minor major 6',
        notation: '-6',
        extends: exports.TRIADS.min
    }
};
function _recursiveExtendedChordCompute(chord, addedTones = []) {
    if (chord.intervals !== undefined) {
        return {
            intervals: chord.intervals,
            addedTones
        };
    }
    return _recursiveExtendedChordCompute(chord.extends, [
        ...chord.addedTones,
        ...addedTones
    ]);
}
// flatten extended chords
exports.COMPUTED_EXTENDED_CHORDS = Object.keys(exports.EXTENDED_CHORDS).map(k => {
    const EXTENDED_CHORD = exports.EXTENDED_CHORDS[k];
    // recursively compute chord, to flatten added tones & initial intervals of chord
    const { intervals, addedTones } = _recursiveExtendedChordCompute(EXTENDED_CHORD);
    return Object.assign(Object.assign({}, EXTENDED_CHORD), { intervals,
        addedTones });
});
const ALL_POSSIBLE_CHORD_NOTATIONS = [
    ...Object.keys(exports.TRIADS).map(key => exports.TRIADS[key]),
    ...exports.COMPUTED_EXTENDED_CHORDS
];
class Chord extends ValuedBarContent_1.ValuedBarContent {
    constructor(params = {
        root: new Note_1.Note({ name: 'C' }),
        value: Note_1.DEFAULT_NOTE_VALUE
    }) {
        var _a, _b, _c;
        super();
        this._notes = [];
        this._definitions = [];
        this.root = params.root;
        if (params.notes !== undefined && params.notes.length > 0) {
            this.notes = params.notes;
            this.value = (_a = params.value) !== null && _a !== void 0 ? _a : Note_1.DEFAULT_NOTE_VALUE;
            this.intervals = this.computeIntervals();
        }
        else {
            this.intervals = (_b = params.intervals) !== null && _b !== void 0 ? _b : utils_1.cloneInstanceObjectArray(exports.TRIADS.maj.intervals);
            this.value = (_c = params.value) !== null && _c !== void 0 ? _c : Note_1.DEFAULT_NOTE_VALUE;
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
            throw new Error('Trying to set a root for a chord, with something that is note a Note');
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
            const matchingIntervals = [];
            // On intervals from the current chord
            for (let i = 0; i < exports.TRIADS[t].intervals.length; i++) {
                const foundIntervals = this.intervals.filter((interval) => {
                    return Interval_1.Interval.equals(interval, exports.TRIADS[t].intervals[i]);
                });
                matchingIntervals.push(...foundIntervals);
                if (foundIntervals.length === 0) {
                    missingIntervals.push(exports.TRIADS[t].intervals[i]);
                }
            }
            missingIntervals.filter(interval => matchingIntervals.findIndex(matchingInterval => interval.value !== matchingInterval.value) === -1);
            triads.push(Object.assign(Object.assign({}, exports.TRIADS[t]), { missingIntervals,
                matchingIntervals }));
        });
        return triads;
    }
    get notation() {
        // Filter each triad defintion
        const possibleTriads = this._possibleTriads;
        // find a perfect match triad
        const perfectMatchedTriad = possibleTriads.find(p => p.missingIntervals.length === 0);
        if (perfectMatchedTriad !== undefined) {
            if (perfectMatchedTriad.intervals.length === this.notes.length) {
                this._definitions = possibleTriads;
                return perfectMatchedTriad.notation;
            }
            else {
                // it lacks a few intervals, find them and compute extended chord to find a match
                const possibleExtendedChords = this.possibleExtendedChords(perfectMatchedTriad);
                if (possibleExtendedChords.length === 0) {
                    const expectedIntervals = [...this.intervals];
                    const foundIntervals = [...perfectMatchedTriad.intervals];
                    const missingIntervals = expectedIntervals.filter(expectedInterval => foundIntervals.findIndex(foundInterval => expectedInterval.name === foundInterval.name) === -1);
                    this._noNotationYet();
                    return this.addTonesToChordNotation(perfectMatchedTriad, missingIntervals);
                }
                const longestExtendedChord = possibleExtendedChords.sort((a, b) => b.addedTones.length - a.addedTones.length)[0];
                const expectedIntervals = [...this.intervals];
                const foundIntervals = [...longestExtendedChord.addedTones, ...longestExtendedChord.intervals];
                if (expectedIntervals > foundIntervals) {
                    const missingIntervals = expectedIntervals.filter(expectedInterval => foundIntervals.findIndex(foundInterval => expectedInterval.name === foundInterval.name) === -1);
                    return this.addTonesToChordNotation(longestExtendedChord, missingIntervals);
                }
                return longestExtendedChord.notation;
            }
        }
        this._noNotationYet();
        return '';
    }
    static fromNotation(notation) {
        const chars = notation.split('');
        let possibleRoot = new Note_1.Note();
        try {
            possibleRoot = Note_1.Note.fromSPN(chars[0] + '4');
            if (chars.length > 1) {
                possibleRoot = Note_1.Note.fromSPN(chars.slice(0, 2).join('') + '4');
            }
            if (chars.length > 2) {
                // root note can contain double sharp or flat
                possibleRoot = Note_1.Note.fromSPN(chars.slice(0, 3).join('') + '4');
            }
        }
        catch (err) {
            // Silent error
        }
        const rootLength = possibleRoot.SPN.length - 1;
        const isolatedPossibleNotation = chars.slice(rootLength, chars.length).join('');
        const foundNotation = ALL_POSSIBLE_CHORD_NOTATIONS.find(chordNotation => chordNotation.notation === isolatedPossibleNotation);
        if (foundNotation !== undefined) {
            const foundNotationIntervals = [...foundNotation.intervals];
            if ('addedTones' in foundNotation) {
                foundNotationIntervals.push(...foundNotation.addedTones);
            }
            return new Chord({
                root: possibleRoot,
                intervals: [
                    ...foundNotationIntervals
                ]
            });
        }
        throw new Error(`Cannot find a chord notation yet for ${notation}`);
    }
    computeNotationWithContext(scale) {
        return '';
    }
    _noNotationYet() {
        console.warn(`No name for this chord yet ${this.root.SPN} ${JSON.stringify(this.intervals.map(i => i.name))}`);
    }
    computeIntervals() {
        const intervals = [];
        this.notes.forEach((n) => {
            // for now choosing the first result of interval from semitones
            // TODO: find algorithm to be sure semitone value is not currently in the chord
            const semitonesBetweenNotes = Note_1.Note.getSemitonesBetween(this.root, n);
            const possibleInterval = Interval_1.Interval.fromSemitonesAndValue(semitonesBetweenNotes < 0
                ? (semitonesBetweenNotes % Note_1.SEMITONES_NUMBER) + Note_1.SEMITONES_NUMBER
                : semitonesBetweenNotes, Note_1.Note.getIndexDifferenceBetween(this.root, n));
            if (possibleInterval !== undefined)
                intervals.push(possibleInterval);
        });
        return intervals;
    }
    /**
     * There is a bit of magic in this function
     * It checks if intervals can be upped to the next octave,
     * If it's the case, it will calculate the new chord notation
     * If not, it will add tones at the end of the chord notation
     */
    addTonesToChordNotation(chordDefinition, intervals) {
        const octaveIntervals = intervals.map(i => {
            if (i.value < 8) {
                return i.raiseOctave();
            }
            return i;
        });
        const sameIntervals = intervals.filter(interval => octaveIntervals.findIndex(octaveInterval => interval.name === octaveInterval.name) > -1);
        if (sameIntervals.length === 0) {
            const newIntervals = [
                ...this.intervals.filter(currentInterval => intervals.findIndex(interval => interval.name === currentInterval.name) === -1),
                ...octaveIntervals
            ];
            const newChordDefinition = new Chord({
                root: this.root.duplicate(),
                intervals: newIntervals
            });
            return newChordDefinition.notation;
        }
        return `${chordDefinition.notation}${octaveIntervals.reduce((p, c) => p + `add(${c.notation})`, '')}`;
    }
    addInterval(interval) {
        this._intervals.push(interval);
        this.notes = this.compute(this.intervals, this.root);
        return this;
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
        const possibleAddedTones = this.possibleAddedTones(triad);
        return exports.COMPUTED_EXTENDED_CHORDS.filter(ec => {
            if (ec.extends.name === triad.name) {
                // for each interval in extended chord definition check
                let areAllTonesMatching = true;
                for (let i = 0; i < ec.addedTones.length; i++) {
                    const ECAddedTone = ec.addedTones[i];
                    let isAddedToneMatched = false;
                    for (let j = 0; j < possibleAddedTones.length; j++) {
                        const addedTone = possibleAddedTones[j];
                        if (ECAddedTone.name === addedTone.name) {
                            isAddedToneMatched = true;
                            break;
                        }
                        else if (addedTone.value < 8) {
                            const octaveAddedTone = addedTone.raiseOctave();
                            if (ECAddedTone.name === octaveAddedTone.name) {
                                isAddedToneMatched = true;
                                break;
                            }
                        }
                    }
                    areAllTonesMatching = areAllTonesMatching && isAddedToneMatched;
                }
                return areAllTonesMatching;
            }
            return false;
        });
    }
}
exports.Chord = Chord;
applyMixins_1.applyMixins(Chord, [IntervalHandler_1.IntervalHandler]);
