import { Pitch } from "./Pitch";
import { Accidental } from "./Accidental";
export declare const NOTES: Array<string>;
export declare class Note {
    private _name;
    private _pitch;
    private _accidental;
    constructor(name: string, pitch?: Pitch, accidental?: Accidental);
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
    static validateName(name: string): boolean;
    static getSemitonesBetween(note1: Note, note2: Note): number;
}
