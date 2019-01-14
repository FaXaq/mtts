import { Pitch } from "./Pitch";
import { Accidental, ACCIDENTAL } from "./Accidental";

export const NOTES: Array<string> = ["A", "B", "C", "D", "E", "F", "G"];
    
export class Note {
    private _name!: string;
    private _pitch!: Pitch;
    private _accidental!: Accidental;

    constructor(name: string, pitch: number, accidental?: Accidental) {
        this.name = name;
        this.pitch = new Pitch(pitch);
        if (accidental) this.accidental = accidental;
    }

    /**
     * Adds a sharp accidental (if one is already there, adds a second one)
     */
    public addSharp() {
        if (!this.accidental) {
            this.accidental = new Accidental(ACCIDENTAL.SHARP)
        } else {
            // this.accidental.addSharp()
        }
    }

    /**
     * Adds a flat to the current note (or flatten the accidental)
     */
    public addFlat() {
        if (!this.accidental) {
            this.accidental = new Accidental(ACCIDENTAL.DOUBLE_SHARP)
        } else {
            // this.accidental.addFlat()
        }
    }

    // 
    public semitonesTo(note: Note) {
        let s: number = 0;
        let noteIndex: number = NOTES.indexOf(this.name);
    }

    /**
     * 
     */
    public next() {
        // if note was B, next one will be a pitch higher
        if (this.name === "B") this.pitch.inc()
        this.name = NOTES[(this.noteIndex + 1) % NOTES.length];
    }

    public previous() {
        // if note was C, previous one will be a pitch lower
        if (this.name === "C") this.pitch.dec()
        this.name = NOTES[((this.noteIndex - 1) + NOTES.length) % NOTES.length];
    }

    // getters & setters
    // name
    set name(name: string) {
        if (Note.validateName(name)) {
            this._name = name;
        } else {
            throw new Error(`Trying to set a name that doesn't exist as a note ${name}. Possible notes : ${NOTES}`);
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
    get noteIndex(): number {
        return NOTES.indexOf(this.name);
    }

    // accidental
    set accidental(accidental: Accidental) {
        this._accidental = accidental;
    }

    get accidental(): Accidental {
        return this._accidental;
    }

    // static methods
    static validateName(name: string) {
        return NOTES.indexOf(name) > -1;
    }
}