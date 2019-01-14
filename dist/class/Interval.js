"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intervals = {
    "P1": {
        "semitones": 0,
        "direct": true,
        "name": "Perfect unison",
        "alt": [],
        "altShort": "",
        "number": "root"
    },
    "d2": {
        "parent": "M2",
        "semitones": -2,
        "name": "Diminished second",
        "alt": [],
        "altShort": "",
        "number": "second"
    },
    "m2": {
        "parent": "M2",
        "semitones": -1,
        "name": "Minor second",
        "alt": ["Semitone", "half tone", "half step"],
        "altShort": "S",
        "number": "second"
    },
    "A1": {
        "parent": "P1",
        "semitones": 1,
        "name": "Augmented unison",
        "alt": ["Semitone", "half tone", "half step"],
        "altShort": "S",
        "number": "root"
    },
    "M2": {
        "parent": "P1",
        "direct": true,
        "semitones": 2,
        "name": "Major second",
        "alt": ["Tone", "whole tone", "whole step"],
        "altShort": "T",
        "number": "second"
    },
    "d3": {
        "parent": "M3",
        "semitones": -2,
        "name": "Diminished third",
        "alt": ["Tone", "whole tone", "whole step"],
        "altShort": "T",
        "number": "third"
    },
    "m3": {
        "parent": "M3",
        "semitones": -1,
        "name": "Minor third",
        "alt": [],
        "altShort": "",
        "number": "third"
    },
    "A2": {
        "parent": "M2",
        "semitones": 1,
        "name": "Augmented second",
        "alt": [],
        "altShort": "",
        "number": "second"
    },
    "M3": {
        "parent": "M2",
        "direct": true,
        "semitones": 2,
        "name": "Major third",
        "alt": [],
        "altShort": "",
        "number": "third"
    },
    "d4": {
        "parent": "P4",
        "semitones": -1,
        "name": "Diminished fourth",
        "alt": [],
        "altShort": "",
        "number": "fourth"
    },
    "P4": {
        "parent": "M3",
        "direct": true,
        "semitones": 1,
        "name": "Perfect fourth",
        "alt": [],
        "altShort": "",
        "number": "fourth"
    },
    "A3": {
        "parent": "M3",
        "semitones": 1,
        "name": "Augmented third",
        "alt": [],
        "altShort": "",
        "number": "third"
    },
    "d5": {
        "parent": "P5",
        "semitones": -1,
        "name": "Diminished fifth",
        "alt": ["Tritone"],
        "altShort": "TT",
        "number": "fifth"
    },
    "A4": {
        "parent": "P4",
        "semitones": 1,
        "name": "Augmented fourth",
        "alt": ["Tritone"],
        "altShort": "TT",
        "number": "fourth"
    },
    "P5": {
        "parent": "P4",
        "direct": true,
        "semitones": 2,
        "name": "Perfect fifth",
        "alt": [],
        "altShort": "",
        "number": "fifth"
    },
    "d6": {
        "parent": "M6",
        "semitones": -2,
        "name": "Diminished sixth",
        "alt": [],
        "altShort": "",
        "number": "sixth"
    },
    "m6": {
        "parent": "M6",
        "semitones": -1,
        "name": "Minor sixth",
        "alt": [],
        "altShort": "",
        "number": "sixth"
    },
    "A5": {
        "parent": "P5",
        "semitones": 1,
        "name": "Augmented fifth",
        "alt": [],
        "altShort": "",
        "number": "fifth"
    },
    "M6": {
        "parent": "P5",
        "direct": true,
        "semitones": 2,
        "name": "Major sixth",
        "alt": [],
        "altShort": "",
        "number": "sixth"
    },
    "d7": {
        "parent": "M7",
        "semitones": -2,
        "name": "Diminished seventh",
        "alt": [],
        "altShort": "",
        "number": "seventh"
    },
    "m7": {
        "parent": "M7",
        "semitones": -1,
        "name": "Minor seventh",
        "alt": [],
        "altShort": "",
        "number": "seventh"
    },
    "A6": {
        "parent": "M6",
        "semitones": 1,
        "name": "Augmented sixth",
        "alt": [],
        "altShort": "",
        "number": "sixth"
    },
    "M7": {
        "parent": "M6",
        "direct": true,
        "semitones": 2,
        "name": "Major seventh",
        "alt": [],
        "altShort": "",
        "number": "seventh"
    },
    "d8": {
        "parent": "P8",
        "semitones": -1,
        "name": "Diminished octave",
        "alt": [],
        "altShort": "",
        "number": "eighth"
    },
    "P8": {
        "parent": "P1",
        "direct": true,
        "semitones": 12,
        "name": "Perfect octave",
        "alt": [],
        "altShort": "",
        "number": "eighth"
    },
    "A7": {
        "parent": "M7",
        "semitones": 1,
        "name": "Augmented seventh",
        "alt": [],
        "altShort": "",
        "number": "seventh"
    },
    "d9": {
        "parent": "M9",
        "semitones": -2,
        "name": "Diminished ninth",
        "alt": [],
        "altShort": "",
        "number": "ninth"
    },
    "m9": {
        "parent": "M9",
        "semitones": -1,
        "name": "Minor ninth",
        "alt": [],
        "altShort": "",
        "number": "ninth"
    },
    "A8": {
        "parent": "P8",
        "semitones": 1,
        "name": "Augmented octave",
        "alt": [],
        "altShort": "",
        "number": "eighth"
    },
    "M9": {
        "parent": "P8",
        "direct": true,
        "semitones": 2,
        "name": "Minor ninth",
        "alt": [],
        "altShort": "",
        "number": "ninth"
    },
    "d10": {
        "parent": "M10",
        "semitones": -2,
        "name": "Diminished tenth",
        "alt": [],
        "altShort": "",
        "number": "tenth"
    },
    "m10": {
        "parent": "M10",
        "semitones": -1,
        "name": "Minor tenth",
        "alt": [],
        "altShort": "",
        "number": "tenth"
    },
    "A9": {
        "parent": "M9",
        "semitones": 1,
        "name": "Augmented ninth",
        "alt": [],
        "altShort": "",
        "number": "ninth"
    },
    "M10": {
        "parent": "M9",
        "direct": true,
        "semitones": 2,
        "name": "Major tenth",
        "alt": [],
        "altShort": "",
        "number": "tenth"
    },
    "d11": {
        "parent": "P11",
        "semitones": -1,
        "name": "Diminished eleventh",
        "alt": [],
        "altShort": "",
        "number": "eleventh"
    },
    "P11": {
        "parent": "M10",
        "direct": true,
        "semitones": 1,
        "name": "Perfect eleventh",
        "alt": [],
        "altShort": "",
        "number": "eleventh"
    },
    "d12": {
        "parent": "P12",
        "semitones": -1,
        "name": "Diminished eleventh",
        "alt": [],
        "altShort": "",
        "number": "twelfth"
    },
    "A11": {
        "parent": "P11",
        "semitones": 1,
        "name": "Augmented eleventh",
        "alt": [],
        "altShort": "",
        "number": "eleventh"
    },
    "P12": {
        "parent": "P11",
        "direct": true,
        "semitones": 2,
        "name": "Perfect eleventh",
        "alt": ["Tritave"],
        "altShort": "",
        "number": "twelfth"
    },
    "d13": {
        "parent": "M13",
        "semitones": -2,
        "name": "Diminished thirteen",
        "alt": [],
        "altShort": "",
        "number": "thirteenth"
    },
    "m13": {
        "parent": "M13",
        "semitones": -1,
        "name": "Minor thirteen",
        "alt": [],
        "altShort": "",
        "number": "thirteenth"
    },
    "A12": {
        "parent": "P12",
        "semitones": 1,
        "name": "Augmented twelfth",
        "alt": [],
        "altShort": "",
        "number": "twelfth"
    },
    "M13": {
        "parent": "P12",
        "direct": true,
        "semitones": 2,
        "name": "Major thirteenth",
        "alt": [],
        "altShort": "",
        "number": "thirteenth"
    },
    "d14": {
        "parent": "M14",
        "semitones": -2,
        "name": "Diminished fourteenth",
        "alt": [],
        "altShort": "",
        "number": "fourteenth"
    },
    "m14": {
        "parent": "M14",
        "semitones": -1,
        "name": "Minor fourteenth",
        "alt": [],
        "altShort": "",
        "number": "fourteenth"
    },
    "A13": {
        "parent": "M13",
        "semitones": 1,
        "name": "Augmented thirteen",
        "alt": [],
        "altShort": "",
        "number": "thirteenth"
    },
    "M14": {
        "parent": "M13",
        "direct": true,
        "semitones": 2,
        "name": "Major fourteenth",
        "alt": [],
        "altShort": "",
        "number": "fourteenth"
    },
    "d15": {
        "parent": "P15",
        "semitones": -1,
        "name": "Diminished fifteenth",
        "alt": [],
        "altShort": "",
        "number": "fifteenth"
    },
    "P15": {
        "parent": "M14",
        "direct": true,
        "semitones": 1,
        "name": "Perfect fifteenth",
        "alt": ["Double octave"],
        "altShort": "",
        "number": "fifteenth"
    },
    "A14": {
        "parent": "M14",
        "semitones": 1,
        "name": "Augmented fourteenth",
        "alt": [],
        "altShort": "",
        "number": "fourteenth"
    },
    "A15": {
        "parent": "P15",
        "semitones": 1,
        "name": "Augmented fifteenth",
        "alt": [],
        "altShort": "",
        "number": "fifteenth"
    }
};
class Interval {
    constructor(id) {
        this.id = id;
    }
    // privates
    populateProps(interval) {
    }
    // getters & setters
    // id
    set id(id) {
        if (Object.keys(exports.intervals).indexOf(id) > -1) {
            this._id = id;
            this.populateProps(exports.intervals[id]);
        }
        else {
            throw new Error(`Provided wrong name for interval : ${name}`);
        }
    }
    get id() {
        return this._id;
    }
    //semitones
    set semitones(semitones) {
        this._semitones = semitones;
    }
    get semitones() {
        return this._semitones;
    }
    set direct(direct) {
        this._direct = direct;
    }
    get direct() {
        return this._direct;
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set alt(alt) {
        this._alt = alt;
    }
    get alt() {
        return this._alt;
    }
    set altShort(altShort) {
        this._altShort = altShort;
    }
    get altShort() {
        return this._altShort;
    }
    set number(number) {
        this._number = number;
    }
    get number() {
        return this._number;
    }
}
exports.Interval = Interval;
