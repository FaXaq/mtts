import { Pitch } from "./Pitch";
import { Accidental, ACCIDENTAL } from "./Accidental";
import { NOTE_VALUE } from "./NoteValue";
import { ValuedBarContent } from "../super/ValuedBarContent";

export const NOTES: Array<string> = ["C", "D", "E", "F", "G", "A", "B"];
export const SEMITONES_NUMBER: number = 12;
export const DEFAULT_NOTE_VALUE: NOTE_VALUE = NOTE_VALUE.QUARTER;
export const BASE_FREQUENCY: number = 440;

interface NoteParams {
  name?: string;
  pitch?: Pitch;
  accidental?: Accidental;
  value?: NOTE_VALUE;
  dots?: number;
}

export class Note extends ValuedBarContent {
  private _name!: string;
  private _pitch!: Pitch;
  private _accidental!: Accidental;

  constructor(params: NoteParams = { name: "C" }) {
    super(params);
    this.name = params.name || "C";
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
      this.accidental = new Accidental({ semitones: ACCIDENTAL.SHARP });
    } else {
      this.accidental.addSharp();
    }
  }

  public sharpenTo(n: number) {
    while (n > 0) {
      this.addSharp();
      n--;
    }
  }

  /**
   * Adds a flat to the current note (or flatten the accidental)
   */
  public addFlat() {
    if (!this.accidental) {
      this.accidental = new Accidental({ semitones: ACCIDENTAL.FLAT });
    } else {
      this.accidental.addFlat();
    }
  }

  public flattenTo(n: number) {
    while (n < 0) {
      this.addFlat();
      n++;
    }
  }

  public next() {
    // if note was B, next one will be a pitch higher
    if (this.name === "B") this.pitch.inc();
    this.name = NOTES[(this.index + 1) % NOTES.length];
  }

  public previous() {
    // if note was C, previous one will be a pitch lower
    if (this.name === "C") this.pitch.dec();
    this.name = NOTES[(this.index - 1 + NOTES.length) % NOTES.length];
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
      accidental: this.accidental
        ? new Accidental({ semitones: this.accidental.semitones })
        : undefined
    });
  }

  public removeAccidental() {
    delete this._accidental;
  }

  // checks
  public hasAccidental(): boolean {
    return this._accidental !== undefined;
  }

  public isBorE() {
    return this.name === "B" || this.name === "E";
  }

  public isCorF() {
    return this.name === "C" || this.name === "F";
  }

  // getters & setters
  // name
  set name(name: string) {
    if (Note.validateName(name)) {
      this._name = name;
    } else {
      throw new Error(
        `Trying to set a name that doesn't exist to a note : ${name}. Possible notes : ${NOTES}`
      );
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

  // frequency
  // Base frequency times 2 pow (semitones to A440 / 12)
  get frequency(): number {
    const baseA: Note = new Note({ name: "A", pitch: new Pitch({ value: 5 }) });
    return BASE_FREQUENCY * Math.pow(2, baseA.getSemitonesTo(this) / 12);
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
      if (NOTES[noteIndex] == "B" || NOTES[noteIndex] == "E") semitones++;
      else semitones += 2;

      noteIndex = (noteIndex + 1) % NOTES.length;
    }

    /* if note1 is previous to note2, substract 12 (octave semitones, since we counted up) to result  */
    if (note2.index < note1.index) semitones -= 12;

    /* count octaves and ADD OR SUBSTRACT semitones of octaves difference (12 * octaveDifference) to the result */
    semitones += (note2.pitch.value - note1.pitch.value) * 12;

    /* count semitones difference between accidentals */
    semitones +=
      (note2.accidental ? note2.accidental.semitones : 0) -
      (note1.accidental ? note1.accidental.semitones : 0);

    return semitones;
  }

  static getIndexDifferenceBetween(note1: Note, note2: Note) {
    return 1 + ((note2.index - note1.index + NOTES.length) % NOTES.length);
  }
}
