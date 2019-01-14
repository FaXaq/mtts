import { Pitch } from "./Pitch";
import { Accidental } from "./Accidental";
export declare const NOTES: Array<string>;
export declare class Note {
    private _name;
    private _pitch;
    private _accidental;
    constructor(name: string, pitch: number, accidental?: Accidental);
    /**
     * Adds a sharp accidental (if one is already there, adds a second one)
     */
    addSharp(): void;
    /**
     * Adds a flat to the current note (or flatten the accidental)
     */
    addFlat(): void;
    semitonesTo(note: Note): void;
    /**
     *
     */
    next(): void;
    previous(): void;
    name: string;
    pitch: Pitch;
    readonly noteIndex: number;
    accidental: Accidental;
    static validateName(name: string): boolean;
}
