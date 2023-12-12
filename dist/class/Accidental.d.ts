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
export declare const ACCIDENTALS_NOTATION: string[];
export declare const ACCIDENTALS: string[];
export declare class Accidental {
    private _semitones;
    constructor(params?: AccidentalParams);
    addSharp(): Accidental;
    addFlat(): Accidental;
    get semitones(): number;
    set semitones(semitones: number);
    get name(): string;
    get SPN(): string;
    static fromString(s: string): Accidental;
    /**
     * To Scientific Pitch Notation
     */
    static toSPN(accidental: Accidental): string;
    /**
     * To Scientific Pitch Notation
     */
    static fromSPN(s: string): Accidental;
}
export {};
