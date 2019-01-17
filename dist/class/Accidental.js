"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ACCIDENTAL;
(function (ACCIDENTAL) {
    ACCIDENTAL[ACCIDENTAL["DOUBLE_FLAT"] = -2] = "DOUBLE_FLAT";
    ACCIDENTAL[ACCIDENTAL["FLAT"] = -1] = "FLAT";
    ACCIDENTAL[ACCIDENTAL["NATURAL"] = 0] = "NATURAL";
    ACCIDENTAL[ACCIDENTAL["SHARP"] = 1] = "SHARP";
    ACCIDENTAL[ACCIDENTAL["DOUBLE_SHARP"] = 2] = "DOUBLE_SHARP";
})(ACCIDENTAL = exports.ACCIDENTAL || (exports.ACCIDENTAL = {}));
class Accidental {
    constructor(params = { semitones: 0 }) {
        this.semitones = params.semitones;
    }
    addSharp() {
        switch (this.semitones) {
            case 2:
                throw new Error(`Cannot add sharp to a DOUBLE_SHARP.`);
            default:
                this.semitones++;
        }
    }
    addFlat() {
        switch (this.semitones) {
            case -2:
                throw new Error(`Cannot add flat to a DOUBLE_FLAT.`);
            default:
                this.semitones--;
        }
    }
    // getters & setters
    // semitones
    get semitones() {
        return this._semitones;
    }
    set semitones(semitones) {
        if (ACCIDENTAL[semitones]) {
            this._semitones = semitones;
        }
        else {
            throw new Error(`Couldn't find a semitone with the value ${semitones}. Semitones available : ${ACCIDENTAL}`);
        }
    }
    // name
    get name() {
        return ACCIDENTAL[this._semitones];
    }
}
exports.Accidental = Accidental;
