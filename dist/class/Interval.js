"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = exports.INTERVALS = exports.SEMITONES_WITHIN_OCTAVE = void 0;
const Note_1 = require("./Note");
exports.SEMITONES_WITHIN_OCTAVE = 12;
exports.INTERVALS = {
    P1: {
        name: 'P1',
        value: 1,
        semitones: 0
    },
    d2: {
        name: 'd2',
        value: 2,
        semitones: 0
    },
    m2: {
        name: 'm2',
        value: 2,
        semitones: 1
    },
    A1: {
        name: 'A1',
        value: 1,
        semitones: 1
    },
    M2: {
        name: 'M2',
        value: 2,
        semitones: 2
    },
    d3: {
        name: 'd3',
        value: 3,
        semitones: 2
    },
    m3: {
        name: 'm3',
        value: 3,
        semitones: 3
    },
    A2: {
        name: 'A2',
        value: 2,
        semitones: 3
    },
    M3: {
        name: 'M3',
        value: 3,
        semitones: 4
    },
    d4: {
        name: 'd4',
        value: 4,
        semitones: 4
    },
    P4: {
        name: 'P4',
        value: 4,
        semitones: 5
    },
    A3: {
        name: 'A3',
        value: 3,
        semitones: 5
    },
    d5: {
        name: 'd5',
        value: 5,
        semitones: 6
    },
    A4: {
        name: 'A4',
        value: 4,
        semitones: 6
    },
    P5: {
        name: 'P5',
        value: 5,
        semitones: 7
    },
    d6: {
        name: 'd6',
        value: 6,
        semitones: 7
    },
    m6: {
        name: 'm6',
        value: 6,
        semitones: 8
    },
    A5: {
        name: 'A5',
        value: 5,
        semitones: 8
    },
    M6: {
        name: 'M6',
        value: 6,
        semitones: 9
    },
    d7: {
        name: 'd7',
        value: 7,
        semitones: 9
    },
    m7: {
        name: 'm7',
        value: 7,
        semitones: 10
    },
    A6: {
        name: 'A6',
        value: 6,
        semitones: 10
    },
    M7: {
        name: 'M7',
        value: 7,
        semitones: 11
    },
    d8: {
        name: 'd8',
        value: 8,
        semitones: 11
    },
    P8: {
        name: 'P8',
        value: 8,
        semitones: 12
    },
    A7: {
        name: 'A7',
        value: 7,
        semitones: 12
    },
    d9: {
        name: 'd9',
        value: 9,
        semitones: 12
    },
    m9: {
        name: 'm9',
        value: 9,
        semitones: 13
    },
    A8: {
        name: 'A8',
        value: 8,
        semitones: 13
    },
    M9: {
        name: 'M9',
        value: 9,
        semitones: 14
    },
    d10: {
        name: 'd10',
        value: 10,
        semitones: 14
    },
    m10: {
        name: 'm10',
        value: 10,
        semitones: 15
    },
    A9: {
        name: 'A9',
        value: 9,
        semitones: 15
    },
    M10: {
        name: 'M10',
        value: 10,
        semitones: 16
    },
    d11: {
        name: 'd11',
        value: 11,
        semitones: 16
    },
    A10: {
        name: 'A10',
        value: 10,
        semitones: 17
    },
    P11: {
        name: 'P11',
        value: 11,
        semitones: 17
    },
    d12: {
        name: 'd12',
        value: 12,
        semitones: 18
    },
    A11: {
        name: 'A11',
        value: 11,
        semitones: 18
    },
    P12: {
        name: 'P12',
        value: 12,
        semitones: 19
    },
    d13: {
        name: 'd13',
        value: 13,
        semitones: 19
    },
    m13: {
        name: 'm13',
        value: 13,
        semitones: 20
    },
    A12: {
        name: 'A12',
        value: 12,
        semitones: 20
    },
    M13: {
        name: 'M13',
        value: 13,
        semitones: 21
    },
    d14: {
        name: 'd14',
        value: 14,
        semitones: 21
    },
    m14: {
        name: 'm14',
        value: 14,
        semitones: 22
    },
    A13: {
        name: 'A13',
        value: 13,
        semitones: 22
    },
    M14: {
        name: 'M14',
        value: 14,
        semitones: 23
    },
    d15: {
        name: 'd15',
        value: 15,
        semitones: 23
    },
    P15: {
        name: 'P15',
        value: 15,
        semitones: 24
    },
    A14: {
        name: 'A14',
        value: 14,
        semitones: 24
    },
    A15: {
        name: 'A15',
        value: 15,
        semitones: 25
    }
};
class Interval {
    constructor(name) {
        if (exports.INTERVALS[name] !== undefined) {
            this.name = name;
            this.semitones = exports.INTERVALS[name].semitones;
            this.value = exports.INTERVALS[name].value;
        }
        else {
            throw new Error(`Interval with ${name} does not exist.`);
        }
    }
    apply(note) {
        return Interval.apply(note, this.name);
    }
    get notation() {
        return Interval.notation(this.name);
    }
    get chordSemitonesNotation() {
        return Interval.chordSemitonesNotation(this);
    }
    raiseOctave() {
        const interval = Interval.raiseOctave(this);
        if (interval !== undefined) {
            return interval;
        }
        return Interval.fromSemitonesAndValue(this.semitones, this.value);
    }
    static raiseOctave(interval) {
        if (interval.value < 8) {
            return Interval.fromSemitonesAndValue(interval.semitones + 12, interval.value + 7);
        }
        else {
            throw new Error(`Interval ${interval.name} cannot be raised to octave.`);
        }
    }
    static fromSemitones(semitones) {
        const intervals = [];
        Object.keys(exports.INTERVALS).forEach((k) => {
            // Forced caste because of Object.keys
            const typedKey = k;
            if (exports.INTERVALS[typedKey].semitones === semitones) {
                intervals.push(new Interval(typedKey));
            }
        });
        return intervals;
    }
    static fromValue(value) {
        const intervals = [];
        Object.keys(exports.INTERVALS).forEach(k => {
            const typedKey = k;
            if (exports.INTERVALS[typedKey].value === value) {
                intervals.push(new Interval(typedKey));
            }
        });
        return intervals;
    }
    static fromSemitonesAndValue(semitones, value) {
        return Interval.fromSemitones(semitones).find((interval) => {
            return interval.value % Note_1.NOTES.length === value % Note_1.NOTES.length;
        });
    }
    static getSemitones(name) {
        return exports.INTERVALS[name].semitones;
    }
    static apply(note, name) {
        const newNote = note.duplicate();
        let intervalValue = Interval.getValue(name);
        /* skip to next note until interval value is reached */
        while (intervalValue > 1) {
            newNote.next();
            intervalValue--;
        }
        /* check if new note has the correct interval semitones difference as the one requested */
        const semitonesDifference = Interval.getSemitones(name) - note.getSemitonesTo(newNote);
        if (semitonesDifference < 0) {
            newNote.flattenTo(semitonesDifference);
        }
        else if (semitonesDifference > 0) {
            newNote.sharpenTo(semitonesDifference);
        }
        return newNote;
    }
    static getValue(name) {
        return exports.INTERVALS[name].value;
    }
    static fromName(name) {
        return new Interval(name);
    }
    static equals(interval1, interval2) {
        return interval1.name === interval2.name;
    }
    static notation(name) {
        if (!(name in exports.INTERVALS)) {
            throw new Error(`No interval known with that name : ${name}. Cannot get its notation.`);
        }
        const [modifier, ...values] = name.split('');
        const value = values.join('');
        switch (value) {
            case '4':
            case '5':
            case '11':
            case '12':
                switch (modifier) {
                    case 'd':
                        return `-${value}`;
                    case 'A':
                        return `+${value}`;
                    default:
                        return value;
                }
            default:
                switch (modifier) {
                    case 'd':
                        return `°${value}`;
                    case 'm':
                        return `-${value}`;
                    case 'A':
                        return `+${value}`;
                    default:
                        return value;
                }
        }
    }
    static chordSemitonesNotation(interval) {
        const semitones = interval.semitones % exports.SEMITONES_WITHIN_OCTAVE;
        if (semitones === 10) {
            return 'X';
        }
        else if (semitones === 11) {
            return 'N';
        }
        return semitones.toString();
    }
    /**
     * Chord semitones notation indicates the semitones of the corresponding interval by only one character.
     * For reference :
     * - 0 means that this is a 0 semitone interval
     * - 1 means that this is a 1 semitone interval
     * - 2 means that this is a 1 semitones interval
     * ...
     * - X means that this is a 10 semitones interval
     * - N means that this is a 11 semitones interval
     * And it circles back to 0.
     * There is no such thing as 12 semitones interval, since there is only one semitone whithin one octave.
     * @param chordSemitonesNotation
     * @returns
     */
    static fromChordSemitonesNotation(chordSemitonesNotation) {
        if (chordSemitonesNotation === 'N') {
            return Interval.fromSemitones(11);
        }
        if (chordSemitonesNotation === 'X') {
            return Interval.fromSemitones(10);
        }
        const parsedNotation = parseInt(chordSemitonesNotation);
        if (!Number.isNaN(parsedNotation) && parsedNotation <= 9) {
            return Interval.fromSemitones(parsedNotation);
        }
    }
}
exports.Interval = Interval;
