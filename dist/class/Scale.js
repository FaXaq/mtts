"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scale = exports.SCALES = void 0;
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
    ACOUSTIC: {
        name: 'acoustic',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('m7')
        ]
    },
    NATURAL_MINOR: {
        name: 'natural_minor',
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
    },
    ALGERIAN: {
        name: 'algerian',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('M7'),
            new Interval_1.Interval('P8'),
            new Interval_1.Interval('M9'),
            new Interval_1.Interval('m10'),
            new Interval_1.Interval('P11'),
            new Interval_1.Interval('P12'),
            new Interval_1.Interval('m13'),
            new Interval_1.Interval('M14')
        ]
    },
    ALTERED: {
        name: 'altered',
        mode: 'super_locrian',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('d4'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('m7')
        ]
    },
    AUGMENTED: {
        name: 'augmented',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('A5'),
            new Interval_1.Interval('M7')
        ]
    },
    BEBOP_DOMINANT: {
        name: 'bebop_dominant',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('m7'),
            new Interval_1.Interval('M7')
        ]
    },
    BLUES: {
        name: 'blues',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m7')
        ]
    },
    ASCENDING_CHROMATIC: {
        name: 'ascending_chromatic',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('A1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('A2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('A5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('A6'),
            new Interval_1.Interval('M7')
        ]
    },
    DESCENDING_CHROMATIC: {
        name: 'decending_chromatic',
        intervals: [
            new Interval_1.Interval('M7'),
            new Interval_1.Interval('m7'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('P1')
        ]
    },
    DORIAN: {
        mode: 'dorian',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('m7')
        ]
    },
    DOUBLE_HARMONIC: {
        name: 'double_harmonic',
        mode: 'flamenco',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('M7')
        ]
    },
    ENIGMATIC: {
        name: 'enigmatic',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('A5'),
            new Interval_1.Interval('A6'),
            new Interval_1.Interval('M7')
        ]
    },
    GYPSY: {
        name: 'gipsy',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('m7')
        ]
    },
    HALF_DIMINISHED: {
        name: 'half_diminished',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('d4'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('m7')
        ]
    },
    HARMONIC_MAJOR: {
        name: 'harmonic_major',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('M7')
        ]
    },
    HARMONIC_MINOR: {
        name: 'harmonic_minor',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('M7')
        ]
    },
    HIRAJOSHI: {
        name: 'hirajoshi',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M7')
        ]
    },
    HUNGRARIAN_GYPSY: {
        name: 'hungrarian_gypsy',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('M7')
        ]
    },
    HUNGRARIAN_MINOR: {
        name: 'hungrarian_minor',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('M7')
        ]
    },
    IN: {
        name: 'in',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m6')
        ]
    },
    INSEN: {
        name: 'insen',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m7')
        ]
    },
    ISTRIAN: {
        name: 'istrian',
        mode: 'istrian',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('d4'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('P5')
        ]
    },
    IWATO: {
        name: 'iwato',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('m7')
        ]
    },
    LOCRIAN: {
        mode: 'locrian',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('m7')
        ]
    },
    LYDIAN_AUGMENTED: {
        name: 'lydian_augmented',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('A5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('M7')
        ]
    },
    LYDIAN: {
        mode: 'lydian',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('M7')
        ]
    },
    MAJOR_BEBOP: {
        name: 'major_bebop',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('A5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('M7')
        ]
    },
    MAJOR_LOCRIAN: {
        name: 'major_locrian',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('m7')
        ]
    },
    MAJOR_PENTATONIC: {
        name: 'major_pentatonic',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6')
        ]
    },
    MELODIC_MINOR_ASCENDING: {
        name: 'melodic_minor_ascending',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('M7')
        ]
    },
    MELODIC_MINOR_DESCENDING: {
        name: 'melodic_minor_descending',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('m7')
        ]
    },
    MINOR_PENTATONIC: {
        name: 'minor_pentatonic',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m7')
        ]
    },
    MIXOLYDIAN: {
        mode: 'mixolydian',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('m7')
        ]
    },
    NEOPOLITAN_MAJOR: {
        name: 'neopolitan_major',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('M7')
        ]
    },
    NEOPOLITAN_MINOR: {
        name: 'neopolitan_minor',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('M7')
        ]
    },
    PERSIAN: {
        name: 'persian',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('M7')
        ]
    },
    PHRYGIAN_DOMINANT: {
        name: 'phrygian_dominant',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('m7')
        ]
    },
    PHRYGIAN: {
        mode: 'phrygian',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('m6'),
            new Interval_1.Interval('m7')
        ]
    },
    PROMETHEUS: {
        name: 'prometheus',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('m7')
        ]
    },
    HARMONICS: {
        name: 'harmonics',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6')
        ]
    },
    TRITONE: {
        name: 'tritones',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('d5'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m7')
        ]
    },
    TWO_SEMITONE_TRITONE: {
        name: 'two_semiton_tritone',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m2'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('m6')
        ]
    },
    UKRANIAN_DORIAN: {
        name: 'ukrarian_dorian',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('P5'),
            new Interval_1.Interval('M6'),
            new Interval_1.Interval('m7')
        ]
    },
    WHOLE_TONE: {
        name: 'whole_tone',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('M2'),
            new Interval_1.Interval('M3'),
            new Interval_1.Interval('A4'),
            new Interval_1.Interval('A5'),
            new Interval_1.Interval('A6')
        ]
    },
    YO: {
        name: 'yo',
        intervals: [
            new Interval_1.Interval('P1'),
            new Interval_1.Interval('m3'),
            new Interval_1.Interval('P4'),
            new Interval_1.Interval('P5'),
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
        // sort intervals by semitones
        this._intervals = intervals.sort((ia, ib) => ia.semitones - ib.semitones);
        // each time intevals changes, compute notes of the scale
        this.notes = this.compute(this.intervals, this.key);
    }
    get name() {
        var _a;
        const definitions = Scale.getDefintionsFromIntervals(this.intervals);
        return definitions.length > 0 ? (_a = definitions[0].name) !== null && _a !== void 0 ? _a : '' : '';
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
