import { Pitch } from "./Pitch";
import { Accidental, ACCIDENTAL } from "./Accidental";
import { NOTE_VALUE } from "./NoteValue";

export const NOTES: Array<string> = ["C", "D", "E", "F", "G", "A", "B"];
export const DEFAULT_NOTE_VALUE: NOTE_VALUE = NOTE_VALUE.QUARTER;

interface NoteParams {
    name: string,
    pitch?: Pitch,
    accidental?: Accidental,
    value?: NOTE_VALUE,
    dots?: number
}

export class Note {
    private _name!: string;
    private _pitch!: Pitch;
    private _accidental!: Accidental;
    private _value!: NOTE_VALUE;
    private _dots!: number;

    constructor(params: NoteParams = { name: "C" }) {
        this.name = params.name;
        this.value = params.value ? params.value : DEFAULT_NOTE_VALUE;
        this.pitch = params.pitch || new Pitch();
        this.dots = params.dots || 0;
        if (params.accidental) this.accidental = params.accidental;
    }

    /**
     * Adds a sharp accidental (if one is already there, adds a second one)
     */
    public addSharp() {
        if (!this.accidental) {
            this.accidental = new Accidental({ semitones: ACCIDENTAL.SHARP })
        } else {
            this.accidental.addSharp()
        }
    }

    public sharpenTo(n: number) {
        while (n > 0) {
            this.addSharp()
            n--
        }
    }

    /**
     * Adds a flat to the current note (or flatten the accidental)
     */
    public addFlat() {
        if (!this.accidental) {
            this.accidental = new Accidental({ semitones: ACCIDENTAL.FLAT })
        } else {
            this.accidental.addFlat()
        }
    }

    public flattenTo(n: number) {
        while (n < 0) {
            this.addFlat()
            n++
        }
    }

    /**
     * 
     */
    public next() {
        // if note was B, next one will be a pitch higher
        if (this.name === "B") this.pitch.inc()
        this.name = NOTES[(this.index + 1) % NOTES.length];
    }

    public previous() {
        // if note was C, previous one will be a pitch lower
        if (this.name === "C") this.pitch.dec()
        this.name = NOTES[((this.index - 1) + NOTES.length) % NOTES.length];
    }

    // Get semitones between this note and the one passed as parameter
    public getSemitonesTo(note: Note): number {
        return Note.getSemitonesBetween(this, note);
    }

    public duplicate() {
        return new Note({
            name: this.name,
            pitch: new Pitch({
                value: this.pitch.value
            }),
            accidental: this.accidental ? new Accidental({ semitones: this.accidental.semitones }) : undefined
        })
    }

    // getters & setters
    // name
    set name(name: string) {
        if (Note.validateName(name)) {
            this._name = name;
        } else {
            throw new Error(`Trying to set a name that doesn't exist to a note : ${name}. Possible notes : ${NOTES}`);
        }
    }

    get name(): string {
        return this._name;
    }

    // pitch
    set pitch(pitch: Pitch) {
        this._pitch = pitch;
    }

    get pitch(): Pitch {
        return this._pitch;
    }

    // note index
    get index(): number {
        return NOTES.indexOf(this.name);
    }

    // accidental
    set accidental(accidental: Accidental) {
        this._accidental = accidental;
    }

    get accidental(): Accidental {
        return this._accidental;
    }

    // value
    set value(value: NOTE_VALUE) {
        this._value = value;
    }

    get value(): NOTE_VALUE {
        return this._value;
    }

    // dotted
    set dots(dots: number) {
        this._dots = dots;
    }

    get dots(): number {
        return this._dots;
    }

    // static methods
    static validateName(name: string) {
        return NOTES.indexOf(name) > -1;
    }

    static getSemitonesBetween(note1: Note, note2: Note): number {
        let semitones = 0;
        let noteIndex = note1.index;

        /* get semitones between two notes (don't care about the pitch or the notes order) */
        while (NOTES[noteIndex] != note2.name) {
            if (NOTES[noteIndex] == "B" || NOTES[noteIndex] == "E") semitones++
            else semitones += 2

            noteIndex = (noteIndex + 1) % NOTES.length
        }

        /* if note1 is previous to note2, substract 12 (octave semitones, since we counted up) to result  */
        if (note2.index < note1.index) semitones -= 12

        /* count octaves and ADD OR SUBSTRACT semitones of octaves difference (12 * octaveDifference) to the result */
        semitones += (note2.pitch.value - note1.pitch.value) * 12;

        /* count semitones difference between accidentals */
        semitones += (note2.accidental ? note2.accidental.semitones : 0) - (note1.accidental ? note1.accidental.semitones : 0);

        return semitones
    }
}