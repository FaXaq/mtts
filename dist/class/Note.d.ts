import { Pitch } from "./Pitch";
import { Accidental } from "./Accidental";
import { NOTE_VALUE } from "./NoteValue";
export declare const NOTES: Array<string>;
export declare const DEFAULT_NOTE_VALUE: NOTE_VALUE;
interface NoteParams {
    name: string;
    pitch?: Pitch;
    accidental?: Accidental;
    value?: NOTE_VALUE;
    dots?: number;
}
export declare class Note {
    private _name;
    private _pitch;
    private _accidental;
    private _value;
    private _dots;
    constructor(params?: NoteParams);
    /**
     * Adds a sharp accidental (if one is already there, adds a second one)
     */
    addSharp(): void;
    sharpenTo(n: number): void;
    /**
     * Adds a flat to the current note (or flatten the accidental)
     */
    addFlat(): void;
    flattenTo(n: number): void;
    /**
     *
     */
    next(): void;
    previous(): void;
    getSemitonesTo(note: Note): number;
    duplicate(): Note;
    name: string;
    pitch: Pitch;
    readonly index: number;
    accidental: Accidental;
    value: NOTE_VALUE;
    dots: number;
    static validateName(name: string): boolean;
    static getSemitonesBetween(note1: Note, note2: Note): number;
}
export {};
