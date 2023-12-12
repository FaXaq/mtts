"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accidental = exports.ACCIDENTALS = exports.ACCIDENTALS_NOTATION = exports.ACCIDENTAL = void 0;
var ACCIDENTAL;
(function (ACCIDENTAL) {
    ACCIDENTAL[ACCIDENTAL["DOUBLE_FLAT"] = -2] = "DOUBLE_FLAT";
    ACCIDENTAL[ACCIDENTAL["FLAT"] = -1] = "FLAT";
    ACCIDENTAL[ACCIDENTAL["NATURAL"] = 0] = "NATURAL";
    ACCIDENTAL[ACCIDENTAL["SHARP"] = 1] = "SHARP";
    ACCIDENTAL[ACCIDENTAL["DOUBLE_SHARP"] = 2] = "DOUBLE_SHARP";
})(ACCIDENTAL = exports.ACCIDENTAL || (exports.ACCIDENTAL = {}));
exports.ACCIDENTALS_NOTATION = ['b', 's'];
exports.ACCIDENTALS = Object.keys(ACCIDENTAL).filter(p => isNaN(parseInt(p)));
class Accidental {
    constructor(params = { semitones: 0 }) {
        this.semitones = params.semitones;
    }
    addSharp() {
        switch (this.semitones) {
            case 2:
                throw new Error('Cannot add sharp to a DOUBLE_SHARP.');
            default:
                this.semitones++;
        }
        return this;
    }
    addFlat() {
        switch (this.semitones) {
            case -2:
                throw new Error('Cannot add flat to a DOUBLE_FLAT.');
            default:
                this.semitones--;
        }
        return this;
    }
    // getters & setters
    // semitones
    get semitones() {
        return this._semitones;
    }
    set semitones(semitones) {
        if (ACCIDENTAL[semitones] !== undefined) {
            this._semitones = semitones;
        }
        else {
            throw new Error(`Couldn't find a semitone with the value ${semitones}. Semitones available : ${Object.keys(ACCIDENTAL).join(', ')}`);
        }
    }
    // name
    get name() {
        return ACCIDENTAL[this._semitones];
    }
    get SPN() {
        return Accidental.toSPN(this);
    }
    static fromString(s) {
        switch (s) {
            case 'b':
            case '♭':
                return new Accidental({
                    semitones: -1
                });
            case 'bb':
            case '𝄫':
                return new Accidental({
                    semitones: -2
                });
            case 's':
            case '#':
            case '♯':
                return new Accidental({
                    semitones: 1
                });
            case '𝄪':
                return new Accidental({
                    semitones: 2
                });
            case 'n':
            case '♮':
                return new Accidental({
                    semitones: 0
                });
            default:
                throw new Error(`Couldn't find an accidental for this string : ${JSON.stringify(s)}.`);
        }
    }
    /**
     * To Scientific Pitch Notation
     */
    static toSPN(accidental) {
        switch (accidental.name) {
            case 'SHARP':
                return '#';
            case 'FLAT':
                return 'b';
            case 'DOUBLE_SHARP':
                return 'x';
            case 'DOUBLE_FLAT':
                return 'bb';
            case 'NATURAL':
                return '';
            default:
                throw new Error(`Couldn't find SPN for this accidental : ${JSON.stringify(accidental)}.`);
        }
    }
    /**
     * To Scientific Pitch Notation
     */
    static fromSPN(s) {
        return Accidental.fromString(s);
    }
}
exports.Accidental = Accidental;
