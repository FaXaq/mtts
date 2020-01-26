export declare enum ACCIDENTAL {
    DOUBLE_FLAT = -2,
    FLAT = -1,
    NATURAL = 0,
    SHARP = 1,
    DOUBLE_SHARP = 2
}
interface AccidentalParams {
    semitones: number;
}
export declare const ACCIDENTALS: string[];
export declare class Accidental {
    private _semitones;
    constructor(params?: AccidentalParams);
    addSharp(): void;
    addFlat(): void;
    semitones: number;
    readonly name: string;
    static fromString(str: string): Accidental | undefined;
}
export {};
