"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pitch_1 = require("./Pitch");
const Accidental_1 = require("./Accidental");
exports.NOTES = ["A", "B", "C", "D", "E", "F", "G"];
class Note {
    constructor(name, pitch, accidental) {
        this.name = name;
        this.pitch = new Pitch_1.Pitch(pitch);
        if (accidental)
            this.accidental = accidental;
    }
    /**
     * Adds a sharp accidental (if one is already there, adds a second one)
     */
    addSharp() {
        if (!this.accidental) {
            this.accidental = new Accidental_1.Accidental(Accidental_1.ACCIDENTAL.SHARP);
        }
        else {
            // this.accidental.addSharp()
        }
    }
    /**
     * Adds a flat to the current note (or flatten the accidental)
     */
    addFlat() {
        if (!this.accidental) {
            this.accidental = new Accidental_1.Accidental(Accidental_1.ACCIDENTAL.DOUBLE_SHARP);
        }
        else {
            // this.accidental.addFlat()
        }
    }
    // 
    semitonesTo(note) {
        let s = 0;
        let noteIndex = exports.NOTES.indexOf(this.name);
    }
    /**
     *
     */
    next() {
        // if note was B, next one will be a pitch higher
        if (this.name === "B")
            this.pitch.inc();
        this.name = exports.NOTES[(this.noteIndex + 1) % exports.NOTES.length];
    }
    previous() {
        // if note was C, previous one will be a pitch lower
        if (this.name === "C")
            this.pitch.dec();
        this.name = exports.NOTES[((this.noteIndex - 1) + exports.NOTES.length) % exports.NOTES.length];
    }
    // getters & setters
    // name
    set name(name) {
        if (Note.validateName(name)) {
            this._name = name;
        }
        else {
            throw new Error(`Trying to set a name that doesn't exist as a note ${name}. Possible notes : ${exports.NOTES}`);
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
    get noteIndex() {
        return exports.NOTES.indexOf(this.name);
    }
    // accidental
    set accidental(accidental) {
        this._accidental = accidental;
    }
    get accidental() {
        return this._accidental;
    }
    // static methods
    static validateName(name) {
        return exports.NOTES.indexOf(name) > -1;
    }
}
exports.Note = Note;
