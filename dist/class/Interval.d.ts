import { Note } from './Note';
export declare const SEMITONES_WITHIN_OCTAVE = 12;
export declare const INTERVALS: {
    P1: {
        name: string;
        value: number;
        semitones: number;
    };
    d2: {
        name: string;
        value: number;
        semitones: number;
    };
    m2: {
        name: string;
        value: number;
        semitones: number;
    };
    A1: {
        name: string;
        value: number;
        semitones: number;
    };
    M2: {
        name: string;
        value: number;
        semitones: number;
    };
    d3: {
        name: string;
        value: number;
        semitones: number;
    };
    m3: {
        name: string;
        value: number;
        semitones: number;
    };
    A2: {
        name: string;
        value: number;
        semitones: number;
    };
    M3: {
        name: string;
        value: number;
        semitones: number;
    };
    d4: {
        name: string;
        value: number;
        semitones: number;
    };
    P4: {
        name: string;
        value: number;
        semitones: number;
    };
    A3: {
        name: string;
        value: number;
        semitones: number;
    };
    d5: {
        name: string;
        value: number;
        semitones: number;
    };
    A4: {
        name: string;
        value: number;
        semitones: number;
    };
    P5: {
        name: string;
        value: number;
        semitones: number;
    };
    d6: {
        name: string;
        value: number;
        semitones: number;
    };
    m6: {
        name: string;
        value: number;
        semitones: number;
    };
    A5: {
        name: string;
        value: number;
        semitones: number;
    };
    M6: {
        name: string;
        value: number;
        semitones: number;
    };
    d7: {
        name: string;
        value: number;
        semitones: number;
    };
    m7: {
        name: string;
        value: number;
        semitones: number;
    };
    A6: {
        name: string;
        value: number;
        semitones: number;
    };
    M7: {
        name: string;
        value: number;
        semitones: number;
    };
    d8: {
        name: string;
        value: number;
        semitones: number;
    };
    P8: {
        name: string;
        value: number;
        semitones: number;
    };
    A7: {
        name: string;
        value: number;
        semitones: number;
    };
    d9: {
        name: string;
        value: number;
        semitones: number;
    };
    m9: {
        name: string;
        value: number;
        semitones: number;
    };
    A8: {
        name: string;
        value: number;
        semitones: number;
    };
    M9: {
        name: string;
        value: number;
        semitones: number;
    };
    d10: {
        name: string;
        value: number;
        semitones: number;
    };
    m10: {
        name: string;
        value: number;
        semitones: number;
    };
    A9: {
        name: string;
        value: number;
        semitones: number;
    };
    M10: {
        name: string;
        value: number;
        semitones: number;
    };
    d11: {
        name: string;
        value: number;
        semitones: number;
    };
    A10: {
        name: string;
        value: number;
        semitones: number;
    };
    P11: {
        name: string;
        value: number;
        semitones: number;
    };
    d12: {
        name: string;
        value: number;
        semitones: number;
    };
    A11: {
        name: string;
        value: number;
        semitones: number;
    };
    P12: {
        name: string;
        value: number;
        semitones: number;
    };
    d13: {
        name: string;
        value: number;
        semitones: number;
    };
    m13: {
        name: string;
        value: number;
        semitones: number;
    };
    A12: {
        name: string;
        value: number;
        semitones: number;
    };
    M13: {
        name: string;
        value: number;
        semitones: number;
    };
    d14: {
        name: string;
        value: number;
        semitones: number;
    };
    m14: {
        name: string;
        value: number;
        semitones: number;
    };
    A13: {
        name: string;
        value: number;
        semitones: number;
    };
    M14: {
        name: string;
        value: number;
        semitones: number;
    };
    d15: {
        name: string;
        value: number;
        semitones: number;
    };
    P15: {
        name: string;
        value: number;
        semitones: number;
    };
    A14: {
        name: string;
        value: number;
        semitones: number;
    };
    A15: {
        name: string;
        value: number;
        semitones: number;
    };
};
export declare type INTERVAL_NAME = keyof typeof INTERVALS;
export declare class Interval {
    name: INTERVAL_NAME;
    semitones: number;
    value: number;
    constructor(name: INTERVAL_NAME);
    apply(note: Note): Note;
    get notation(): string;
    get chordSemitonesNotation(): string;
    raiseOctave(): Interval;
    static raiseOctave(interval: Interval): Interval | undefined;
    static fromSemitones(semitones: number): Interval[];
    static fromValue(value: number): Interval[];
    static fromSemitonesAndValue(semitones: number, value: number): Interval | undefined;
    static getSemitones(name: keyof typeof INTERVALS): number;
    static apply(note: Note, name: keyof typeof INTERVALS): Note;
    static getValue(name: keyof typeof INTERVALS): number;
    static fromName(name: INTERVAL_NAME): Interval;
    static equals(interval1: Interval, interval2: Interval): boolean;
    static notation(name: string): string;
    static chordSemitonesNotation(interval: Interval): string;
    /**
     * Chord semitones notation indicates the semitones of the corresponding interval by only one character.
     * For reference :
     * - 0 means that this is a 0 semitone interval
     * - 1 means that this is a 1 semitone interval
     * - 2 means that this is a 1 semitones interval
     * ...
     * - X means that this is a 10 semitones interval
     * - N means that this is a 11 semitones interval
     * And it circles back to 0.
     * There is no such thing as 12 semitones interval, since there is only one semitone whithin one octave.
     * @param chordSemitonesNotation
     * @returns
     */
    static fromChordSemitonesNotation(chordSemitonesNotation: string): Interval[] | undefined;
}
