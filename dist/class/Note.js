"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pitch_1 = require("./Pitch");
const Accidental_1 = require("./Accidental");
const NoteValue_1 = require("./NoteValue");
const ValuedBarContent_1 = require("../super/ValuedBarContent");
exports.NOTES = ["C", "D", "E", "F", "G", "A", "B"];
exports.SEMITONES_NUMBER = 12;
exports.DEFAULT_NOTE_VALUE = NoteValue_1.NOTE_VALUE.QUARTER;
exports.BASE_FREQUENCY = 440;
class Note extends ValuedBarContent_1.ValuedBarContent {
    constructor(params = { name: 'C' }) {
        super(params);
        this.name = params.name || 'C';
        this.value = params.value ? params.value : exports.DEFAULT_NOTE_VALUE;
        this.pitch = params.pitch || new Pitch_1.Pitch();
        this.dots = params.dots || 0;
        if (params.accidental)
            this.accidental = params.accidental;
    }
    /**
     * Adds a sharp accidental (if one is already there, adds a second one)
     */
    addSharp() {
        if (!this.accidental) {
            this.accidental = new Accidental_1.Accidental({ semitones: Accidental_1.ACCIDENTAL.SHARP });
        }
        else {
            this.accidental.addSharp();
        }
    }
    sharpenTo(n) {
        while (n > 0) {
            this.addSharp();
            n--;
        }
    }
    /**
     * Adds a flat to the current note (or flatten the accidental)
     */
    addFlat() {
        if (!this.accidental) {
            this.accidental = new Accidental_1.Accidental({ semitones: Accidental_1.ACCIDENTAL.FLAT });
        }
        else {
            this.accidental.addFlat();
        }
    }
    flattenTo(n) {
        while (n < 0) {
            this.addFlat();
            n++;
        }
    }
    next() {
        // if note was B, next one will be a pitch higher
        if (this.name === "B")
            this.pitch.inc();
        this.name = exports.NOTES[(this.index + 1) % exports.NOTES.length];
    }
    previous() {
        // if note was C, previous one will be a pitch lower
        if (this.name === "C")
            this.pitch.dec();
        this.name = exports.NOTES[((this.index - 1) + exports.NOTES.length) % exports.NOTES.length];
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
            accidental: this.accidental ? new Accidental_1.Accidental({ semitones: this.accidental.semitones }) : undefined
        });
    }
    removeAccidental() {
        delete this._accidental;
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
            throw new Error(`Trying to set a name that doesn't exist to a note : ${name}. Possible notes : ${exports.NOTES}`);
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
        return this._accidental;
    }
    // frequency
    // Base frequency times 2 pow (semitones to A440 / 12)
    get frequency() {
        const baseA = new Note({ name: 'A', pitch: new Pitch_1.Pitch({ value: 5 }) });
        return exports.BASE_FREQUENCY * Math.pow(2, baseA.getSemitonesTo(this) / 12);
    }
    // static methods
    static validateName(name) {
        return exports.NOTES.indexOf(name) > -1;
    }
    static getSemitonesBetween(note1, note2) {
        let semitones = 0;
        let noteIndex = note1.index;
        /* get semitones between two notes (don't care about the pitch or the notes order) */
        while (exports.NOTES[noteIndex] != note2.name) {
            if (exports.NOTES[noteIndex] == "B" || exports.NOTES[noteIndex] == "E")
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
        semitones += (note2.accidental ? note2.accidental.semitones : 0) - (note1.accidental ? note1.accidental.semitones : 0);
        return semitones;
    }
    static getIndexDifferenceBetween(note1, note2) {
        return 1 + (note2.index - note1.index + exports.NOTES.length) % exports.NOTES.length;
    }
}
exports.Note = Note;
