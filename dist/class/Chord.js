"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chord = exports.COMPUTED_EXTENDED_CHORDS = exports.EXTENDED_CHORDS = exports.TRIADS = void 0;
const Note_1 = require("./Note");
const Interval_1 = require("./Interval");
const ValuedBarContent_1 = require("../super/ValuedBarContent");
const utils_1 = require("../misc/utils");
exports.TRIADS = {
    maj: {
        key: 'maj',
        name: 'major',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('M3'), new Interval_1.Interval('P5')],
        notation: ''
    },
    min: {
        key: 'min',
        name: 'minor',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('m3'), new Interval_1.Interval('P5')],
        notation: '-'
    },
    aug: {
        key: 'aug',
        name: 'augmented',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('M3'), new Interval_1.Interval('A5')],
        notation: '+'
    },
    dim: {
        key: 'dim',
        name: 'diminished',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('m3'), new Interval_1.Interval('d5')],
        notation: '°'
    },
    sus2: {
        key: 'sus2',
        name: 'suspended2',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('M2'), new Interval_1.Interval('P5')],
        notation: 'sus2'
    },
    sus4: {
        key: 'sus4',
        name: 'suspended4',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('P4'), new Interval_1.Interval('P5')],
        notation: 'sus4'
    },
    power: {
        key: 'power',
        name: 'power',
        intervals: [new Interval_1.Interval('P1'), new Interval_1.Interval('P5')],
        notation: '5'
    }
};
exports.EXTENDED_CHORDS = {
    M7: {
        key: 'M7',
        addedTones: [new Interval_1.Interval('M7')],
        name: 'major 7',
        notation: 'M7',
        extends: exports.TRIADS.maj
    },
    7: {
        key: '7',
        addedTones: [new Interval_1.Interval('m7')],
        name: 'dominant 7',
        notation: '7',
        extends: exports.TRIADS.maj
    },
    '-7/5b': {
        key: '-7/5b',
        addedTones: [new Interval_1.Interval('m7')],
        name: 'minor 7 flat 5',
        notation: '-7/5b',
        extends: exports.TRIADS.dim
    },
    m7: {
        key: 'm7',
        addedTones: [new Interval_1.Interval('m7')],
        name: 'minor 7',
        notation: '-7',
        extends: exports.TRIADS.min
    },
    '7sus4': {
        key: '7sus4',
        addedTones: [new Interval_1.Interval('m7')],
        name: 'dominant 7 sus 4',
        notation: '7sus4',
        extends: exports.TRIADS.sus4
    },
    d7: {
        key: 'd7',
        addedTones: [new Interval_1.Interval('d7')],
        name: 'diminished 7',
        notation: '°7',
        extends: exports.TRIADS.dim
    },
    mM7: {
        key: 'mM7',
        addedTones: [new Interval_1.Interval('M7')],
        name: 'minor major 7',
        notation: 'mM7',
        extends: exports.TRIADS.min
    },
    9: {
        key: '9',
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9')],
        name: '7(9)',
        notation: '9',
        extends: exports.TRIADS.maj
    },
    M9: {
        key: 'M9',
        addedTones: [new Interval_1.Interval('M7'), new Interval_1.Interval('M9')],
        name: 'M7(9)',
        notation: 'M9',
        extends: exports.TRIADS.maj
    },
    min9: {
        key: 'min9',
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9')],
        name: '-7(9)',
        notation: '-9',
        extends: exports.TRIADS.min
    },
    11: {
        key: '11',
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11')],
        name: '7(11)',
        notation: '11',
        extends: exports.TRIADS.maj
    },
    M11: {
        key: 'M11',
        addedTones: [new Interval_1.Interval('M7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11')],
        name: 'M7(11)',
        notation: 'M11',
        extends: exports.TRIADS.maj
    },
    m11: {
        key: 'm11',
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11')],
        name: '-7(11)',
        notation: '-11',
        extends: exports.TRIADS.min
    },
    13: {
        key: '13',
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11'), new Interval_1.Interval('M13')],
        name: '7(13)',
        notation: '13',
        extends: exports.TRIADS.maj
    },
    M13: {
        key: 'M13',
        addedTones: [new Interval_1.Interval('M7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11'), new Interval_1.Interval('M13')],
        name: 'M7(13)',
        notation: 'M13',
        extends: exports.TRIADS.maj
    },
    m13: {
        key: 'm13',
        addedTones: [new Interval_1.Interval('m7'), new Interval_1.Interval('M9'), new Interval_1.Interval('P11'), new Interval_1.Interval('M13')],
        name: '-7(13)',
        notation: '-13',
        extends: exports.TRIADS.min
    },
    6: {
        key: '6',
        addedTones: [new Interval_1.Interval('M6')],
        name: 'major 6',
        notation: '6',
        extends: exports.TRIADS.maj
    },
    min6: {
        key: 'min6',
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
    return Object.assign(Object.assign({}, EXTENDED_CHORD), { intervals: [...intervals, ...addedTones] });
});
const ALL_POSSIBLE_CHORDS = [
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
        }
        else {
            this.intervals = (_b = params.intervals) !== null && _b !== void 0 ? _b : utils_1.cloneInstanceObjectArray(exports.TRIADS.maj.intervals);
            this.value = (_c = params.value) !== null && _c !== void 0 ? _c : Note_1.DEFAULT_NOTE_VALUE;
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
        const notes = [];
        intervals.forEach(i => {
            if (!(i instanceof Interval_1.Interval)) {
                throw new Error(`Trying to set interval for chords, but ${JSON.stringify(i)} is not an Interval.`);
            }
            notes.push(Interval_1.Interval.apply(this._root, i.name));
        });
        this._notes = notes;
        this._intervals = intervals;
    }
    set notes(notes) {
        const lowestNote = notes.sort((n1, n2) => n1.frequency - n2.frequency)[0];
        const semitonesAndValues = notes.map(note => ({
            semitones: Note_1.Note.getNormalizedSemitonesBetween(this._root, note),
            value: Note_1.Note.getIndexDifferenceBetween(this._root, note)
        }));
        const intervals = semitonesAndValues.map(({ semitones, value }, i) => {
            const interval = Interval_1.Interval.fromSemitonesAndValue(semitones, value);
            if (interval === undefined) {
                throw new Error(`Chord.notes (setter) : Trying to set a note within chord with semitones (${semitones}) and value (${value}). Note: ${notes[i].SPN} against root ${this._root.SPN}.`);
            }
            return interval;
        });
        this._root = lowestNote;
        this._intervals = intervals;
        this._notes = notes;
    }
    get notes() {
        const notes = this._intervals.map(interval => (Interval_1.Interval.apply(this._root, interval.name)));
        this._notes = notes;
        return notes;
    }
    get notation() {
        const semitonesNotation = this.semitonesNotation;
        const possibleChords = Chord.getDefinitionsFromSemitonesNotation(semitonesNotation);
        if (possibleChords.length > 0) {
            const chord = possibleChords[0];
            if (chord.addedTones.length > 0) {
                return `${chord.chordDefinition.notation}${chord.addedTones.map(i => `add(${i.notation})`).join('')}`;
            }
            return chord.chordDefinition.notation;
        }
        else {
            console.log('We need to find a way to select a chord here....');
        }
        this._noNotationYet();
        return '';
    }
    /**
     * Use chord semitones notation to generate chord name.
     * Each semitone within the chord is represented as a digit or X or N.
     * For reference :
     * - 0 means that this is a 0 semitone interval
     * - 1 means that this is a 1 semitone interval
     * - 2 means that this is a 1 semitones interval
     * ...
     * - X means that this is a 10 semitones interval
     * - N means that this is a 11 semitones interval
     * And it circles back to 0.
     * There is no such thing as 12 semitones interval, since there is only one semitone whithin one octave.
     * @param notation
     * @returns
     */
    static getDefinitionsFromSemitonesNotation(notation) {
        const possibleChords = ALL_POSSIBLE_CHORDS.map(chord => {
            return {
                chordDefinition: chord,
                semitonesNotation: chord.intervals.map((interval) => interval.chordSemitonesNotation).join('')
            };
        });
        return possibleChords
            // Extract every fully matching chord notations
            .filter(pc => pc.semitonesNotation.split('').every(i => notation.includes(i)))
            // Add missing tones from each match
            .map(pc => {
            let addedTones = [];
            if (notation.length > pc.semitonesNotation.length) {
                addedTones = notation
                    // extract missing semitones intervals from the possible chord
                    .split('')
                    .filter(interval => !pc.semitonesNotation.includes(interval))
                    .map(interval => {
                    var _a;
                    // Find possible intervals
                    const possibleAddedTone = Interval_1.Interval.fromChordSemitonesNotation(interval);
                    // Remove intervals with value that are already used within the chord
                    const filteredAddedTone = (_a = possibleAddedTone === null || possibleAddedTone === void 0 ? void 0 : possibleAddedTone.filter(pi => pc.chordDefinition.intervals.find(pci => pci.value === pi.value) === undefined)) !== null && _a !== void 0 ? _a : [];
                    // If we're here, it means it's down to one possible added tone. We can safely add it to the chord.
                    const addedTone = filteredAddedTone[0];
                    // Added tones are conventionnaly marked to the octave. We need to raise them as it's not done already.
                    if (addedTone.value < 8) {
                        const raisedAddedTone = Interval_1.Interval.raiseOctave(addedTone);
                        if (raisedAddedTone !== undefined) {
                            return raisedAddedTone;
                        }
                    }
                    return addedTone;
                });
            }
            return Object.assign(Object.assign({}, pc), { addedTones });
        })
            // Sort for the one with the longest definition to be at first position
            .sort((a, b) => b.semitonesNotation.length - a.semitonesNotation.length);
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
        const foundNotation = ALL_POSSIBLE_CHORDS.find(chordNotation => chordNotation.notation === isolatedPossibleNotation);
        if (foundNotation !== undefined) {
            return new Chord({
                root: possibleRoot,
                intervals: [
                    ...foundNotation.intervals
                ]
            });
        }
        throw new Error(`Cannot find a chord notation yet for ${notation}`);
    }
    get semitonesNotation() {
        const semitones = [];
        for (const note of this.notes) {
            const semitoneFromRoot = Note_1.Note.getSemitonesBetween(this._root, note);
            if (semitoneFromRoot === 10) {
                semitones.push('X');
            }
            else if (semitoneFromRoot === 11) {
                semitones.push('N');
            }
            else {
                semitones.push(semitoneFromRoot);
            }
        }
        return semitones.join('');
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
                ? (semitonesBetweenNotes % Interval_1.SEMITONES_WITHIN_OCTAVE) + Interval_1.SEMITONES_WITHIN_OCTAVE
                : semitonesBetweenNotes, Note_1.Note.getIndexDifferenceBetween(this.root, n));
            if (possibleInterval !== undefined)
                intervals.push(possibleInterval);
        });
        return intervals;
    }
    addInterval(interval) {
        this._intervals.push(interval);
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
}
exports.Chord = Chord;
