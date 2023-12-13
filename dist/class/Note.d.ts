import { Pitch } from './Pitch';
import { Accidental } from './Accidental';
import { NOTE_VALUE } from './NoteValue';
import { ValuedBarContent } from '../super/ValuedBarContent';
export declare const NOTES: string[];
export declare const DEFAULT_NOTE_VALUE: NOTE_VALUE;
export declare const BASE_FREQUENCY: number;
interface NoteParams {
    name?: string;
    pitch?: Pitch;
    accidental?: Accidental;
    value?: NOTE_VALUE;
    dots?: number;
}
export declare class Note extends ValuedBarContent {
    private _name;
    private _pitch;
    private _accidental?;
    constructor(params?: NoteParams);
    /**
     * Adds a sharp accidental (if one is already there, adds a second one)
     */
    addSharp(): Note;
    sharpenTo(n: number): Note;
    /**
     * Adds a flat to the current note (or flatten the accidental)
     */
    addFlat(): Note;
    flattenTo(n: number): Note;
    next(): Note;
    previous(): Note;
    sharpenChromatically(semitones?: number): Note;
    flattenChromatically(semitones?: number): Note;
    getSemitonesTo(note: Note): number;
    duplicate(): Note;
    removeAccidental(): Note;
    hasAccidental(): boolean;
    isBorE(): boolean;
    isCorF(): boolean;
    set name(name: string);
    get name(): string;
    set pitch(pitch: Pitch);
    get pitch(): Pitch;
    get index(): number;
    set accidental(accidental: Accidental);
    get accidental(): Accidental;
    get frequency(): number;
    get SPN(): string;
    static validateName(name: string): boolean;
    static getSemitonesBetween(note1: Note, note2: Note): number;
    /**
     * Get semitones between notes, ALWAYS considering destination note is ABOVE root and within one octave.
     * @param note1 The root from which you want to start counting semitones
     * @param note2 The destination note
     */
    static getNormalizedSemitonesBetween(note1: Note, note2: Note): number;
    static getIndexDifferenceBetween(note1: Note, note2: Note): number;
    /**
     * To Scientific Pitch Notation
     */
    static toSPN(n: Note): string;
    /**
     * From Scientific Pitch Notation
     */
    static fromSPN(s: string): Note;
}
export {};
