"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.BASE_FREQUENCY = exports.DEFAULT_NOTE_VALUE = exports.SEMITONES_NUMBER = exports.NOTES = void 0;
const Pitch_1 = require("./Pitch");
const Accidental_1 = require("./Accidental");
const NoteValue_1 = require("./NoteValue");
const ValuedBarContent_1 = require("../super/ValuedBarContent");
exports.NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
exports.SEMITONES_NUMBER = 12;
exports.DEFAULT_NOTE_VALUE = NoteValue_1.NOTE_VALUES.QUARTER;
exports.BASE_FREQUENCY = 440;
class Note extends ValuedBarContent_1.ValuedBarContent {
    constructor(params = { name: 'C' }) {
        var _a, _b, _c, _d;
        super(params);
        this.name = (_a = params.name) !== null && _a !== void 0 ? _a : 'C';
        this.value = (_b = params.value) !== null && _b !== void 0 ? _b : exports.DEFAULT_NOTE_VALUE;
        this.pitch = (_c = params.pitch) !== null && _c !== void 0 ? _c : new Pitch_1.Pitch();
        this.dots = (_d = params.dots) !== null && _d !== void 0 ? _d : 0;
        if (params.accidental !== undefined)
            this.accidental = params.accidental;
    }
    /**
     * Adds a sharp accidental (if one is already there, adds a second one)
     */
    addSharp() {
        if (!this.hasAccidental()) {
            this.accidental = new Accidental_1.Accidental({ semitones: Accidental_1.ACCIDENTAL.SHARP });
        }
        else {
            this.accidental.addSharp();
        }
        return this;
    }
    sharpenTo(n) {
        while (n > 0) {
            this.addSharp();
            n--;
        }
        return this;
    }
    /**
     * Adds a flat to the current note (or flatten the accidental)
     */
    addFlat() {
        if (!this.hasAccidental()) {
            this.accidental = new Accidental_1.Accidental({ semitones: Accidental_1.ACCIDENTAL.FLAT });
        }
        else {
            this.accidental.addFlat();
        }
        return this;
    }
    flattenTo(n) {
        while (n < 0) {
            this.addFlat();
            n++;
        }
        return this;
    }
    next() {
        // if note was B, next one will be a pitch higher
        if (this.name === 'B')
            this.pitch.inc();
        this.name = exports.NOTES[(this.index + 1) % exports.NOTES.length];
        return this;
    }
    previous() {
        // if note was C, previous one will be a pitch lower
        if (this.name === 'C')
            this.pitch.dec();
        this.name = exports.NOTES[(this.index - 1 + exports.NOTES.length) % exports.NOTES.length];
        return this;
    }
    sharpenChromatically(semitones = 1) {
        for (let i = 0; i < semitones; i++) {
            if (!this.hasAccidental()) {
                if (this.isBorE()) {
                    this.next();
                }
                else {
                    this.addSharp();
                }
            }
            else {
                if (this.accidental.semitones === -1) {
                    this.addSharp();
                }
                else if (this.isBorE()) {
                    this.removeAccidental();
                    this.next().addSharp();
                }
                else {
                    this.removeAccidental();
                    this.next();
                }
            }
        }
        return this;
    }
    flattenChromatically(semitones = 1) {
        for (let i = 0; i < semitones; i++) {
            if (!this.hasAccidental()) {
                if (this.isCorF()) {
                    this.previous();
                }
                else {
                    this.addFlat();
                }
            }
            else {
                if (this.accidental.semitones === 1) {
                    this.addFlat();
                }
                else if (this.isCorF()) {
                    this.removeAccidental();
                    this.previous().addFlat();
                }
                else {
                    this.removeAccidental();
                    this.previous();
                }
            }
        }
        return this;
    }
    // Get semitones between this note and the one passed as parameter
    getSemitonesTo(note) {
        return Note.getSemitonesBetween(this, note);
    }
    duplicate() {
        return new Note({
            name: this.name,
            pitch: new Pitch_1.Pitch({
                value: this.pitch.value
            }),
            accidental: this.accidental !== undefined
                ? new Accidental_1.Accidental({ semitones: this.accidental.semitones })
                : undefined
        });
    }
    removeAccidental() {
        delete this._accidental;
        return this;
    }
    // checks
    hasAccidental() {
        return this._accidental !== undefined;
    }
    isBorE() {
        return this.name === 'B' || this.name === 'E';
    }
    isCorF() {
        return this.name === 'C' || this.name === 'F';
    }
    // getters & setters
    // name
    set name(name) {
        if (Note.validateName(name)) {
            this._name = name;
        }
        else {
            throw new Error(`Trying to set a name that doesn't exist to a note : ${name}. Possible notes : ${exports.NOTES.join(', ')}`);
        }
    }
    get name() {
        return this._name;
    }
    // pitch
    set pitch(pitch) {
        this._pitch = pitch;
    }
    get pitch() {
        return this._pitch;
    }
    // note index
    get index() {
        return exports.NOTES.indexOf(this.name);
    }
    // accidental
    set accidental(accidental) {
        this._accidental = accidental;
    }
    get accidental() {
        var _a;
        return (_a = this._accidental) !== null && _a !== void 0 ? _a : new Accidental_1.Accidental();
    }
    // frequency
    // Base frequency times 2 pow (semitones to A440 / 12)
    get frequency() {
        const baseA = new Note({ name: 'A', pitch: new Pitch_1.Pitch({ value: 4 }) });
        return exports.BASE_FREQUENCY * Math.pow(2, baseA.getSemitonesTo(this) / 12);
    }
    get SPN() {
        return Note.toSPN(this);
    }
    // static methods
    static validateName(name) {
        return exports.NOTES.indexOf(name) > -1;
    }
    static getSemitonesBetween(note1, note2) {
        let semitones = 0;
        let noteIndex = note1.index;
        /* get semitones between two notes (don't care about the pitch or the notes order) */
        while (exports.NOTES[noteIndex] !== note2.name) {
            if (exports.NOTES[noteIndex] === 'B' || exports.NOTES[noteIndex] === 'E')
                semitones++;
            else
                semitones += 2;
            noteIndex = (noteIndex + 1) % exports.NOTES.length;
        }
        /* if note1 is previous to note2, substract 12 (octave semitones, since we counted up) to result  */
        if (note2.index < note1.index)
            semitones -= 12;
        /* count octaves and ADD OR SUBSTRACT semitones of octaves difference (12 * octaveDifference) to the result */
        semitones += (note2.pitch.value - note1.pitch.value) * 12;
        /* count semitones difference between accidentals */
        semitones +=
            (note2.hasAccidental() ? note2.accidental.semitones : 0) -
                (note1.hasAccidental() ? note1.accidental.semitones : 0);
        return semitones;
    }
    static getIndexDifferenceBetween(note1, note2) {
        return 1 + ((note2.index - note1.index + exports.NOTES.length) % exports.NOTES.length);
    }
    /**
     * To Scientific Pitch Notation
     */
    static toSPN(n) {
        try {
            return `${n.name}${n.hasAccidental() ? n.accidental.SPN : ''}${n.pitch.value}`;
        }
        catch (err) {
            throw new Error(`The note you provided is incorrect. You provided : ${JSON.stringify(n)}.`);
        }
    }
    /**
     * From Scientific Pitch Notation
     */
    static fromSPN(s) {
        try {
            return new Note({
                name: s[0],
                accidental: s.length > 2 ? Accidental_1.Accidental.fromSPN(s.slice(1, s.length - 1)) : undefined,
                pitch: new Pitch_1.Pitch({
                    value: parseInt(s[s.length - 1])
                })
            });
        }
        catch (err) {
            throw new Error(`The string you provided is not a Scientific Pitch Notation. You provided : ${s}.`);
        }
    }
}
exports.Note = Note;
