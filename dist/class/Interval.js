"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERVALS = {
    "P1": {
        "value": 1,
        "semitones": 0
    },
    "d2": {
        "value": 2,
        "semitones": 0
    },
    "m2": {
        "value": 2,
        "semitones": 1
    },
    "A1": {
        "value": 1,
        "semitones": 1
    },
    "M2": {
        "value": 2,
        "semitones": 2
    },
    "d3": {
        "value": 3,
        "semitones": 2
    },
    "m3": {
        "value": 3,
        "semitones": 3
    },
    "A2": {
        "value": 2,
        "semitones": 3
    },
    "M3": {
        "value": 3,
        "semitones": 4
    },
    "d4": {
        "value": 4,
        "semitones": 4
    },
    "P4": {
        "value": 4,
        "semitones": 5
    },
    "A3": {
        "value": 3,
        "semitones": 5
    },
    "d5": {
        "value": 5,
        "semitones": 6
    },
    "A4": {
        "value": 4,
        "semitones": 6
    },
    "P5": {
        "value": 5,
        "semitones": 7
    },
    "d6": {
        "value": 6,
        "semitones": 7
    },
    "m6": {
        "value": 6,
        "semitones": 8
    },
    "A5": {
        "value": 5,
        "semitones": 8
    },
    "M6": {
        "value": 6,
        "semitones": 9
    },
    "d7": {
        "value": 7,
        "semitones": 9
    },
    "m7": {
        "value": 7,
        "semitones": 10
    },
    "A6": {
        "value": 6,
        "semitones": 10
    },
    "M7": {
        "value": 7,
        "semitones": 11
    },
    "d8": {
        "value": 8,
        "semitones": 11
    },
    "P8": {
        "value": 8,
        "semitones": 12
    },
    "A7": {
        "value": 7,
        "semitones": 12
    },
    "d9": {
        "value": 9,
        "semitones": 12
    },
    "m9": {
        "value": 9,
        "semitones": 13
    },
    "A8": {
        "value": 8,
        "semitones": 13
    },
    "M9": {
        "value": 9,
        "semitones": 14
    },
    "d10": {
        "value": 10,
        "semitones": 14
    },
    "m10": {
        "value": 10,
        "semitones": 15
    },
    "A9": {
        "value": 9,
        "semitones": 15
    },
    "M10": {
        "value": 10,
        "semitones": 16
    },
    "d11": {
        "value": 11,
        "semitones": 16
    },
    "A10": {
        "value": 10,
        "semitones": 17
    },
    "P11": {
        "value": 11,
        "semitones": 17
    },
    "d12": {
        "value": 12,
        "semitones": 18
    },
    "A11": {
        "value": 11,
        "semitones": 18
    },
    "P12": {
        "value": 12,
        "semitones": 19
    },
    "d13": {
        "value": 13,
        "semitones": 19
    },
    "m13": {
        "value": 13,
        "semitones": 20
    },
    "A12": {
        "value": 12,
        "semitones": 20
    },
    "M13": {
        "value": 13,
        "semitones": 21
    },
    "d14": {
        "value": 14,
        "semitones": 21
    },
    "m14": {
        "value": 14,
        "semitones": 22
    },
    "A13": {
        "value": 13,
        "semitones": 22
    },
    "M14": {
        "value": 14,
        "semitones": 23
    },
    "d15": {
        "value": 15,
        "semitones": 23
    },
    "P15": {
        "value": 15,
        "semitones": 24
    },
    "A14": {
        "value": 14,
        "semitones": 24
    },
    "A15": {
        "value": 15,
        "semitones": 25
    }
};
class Interval {
    constructor() { }
    static getSemitones(name) {
        return exports.INTERVALS[name].semitones;
    }
    static getNote(note, name) {
        let newNote = note.duplicate();
        let intervalValue = Interval.getValue(name);
        /* skip to next note until interval value is reached */
        while (intervalValue > 1) {
            newNote.next();
            intervalValue--;
        }
        /* check if new note has the correct interval semitones difference as the one requested */
        let semitonesDifference = Interval.getSemitones(name) - note.getSemitonesTo(newNote);
        console.log(semitonesDifference);
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
}
exports.Interval = Interval;
