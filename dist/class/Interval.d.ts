import { Note } from "./Note";
interface IInterval {
    value: number;
    semitones: number;
}
export declare const INTERVALS: {
    [key: string]: IInterval;
};
export declare class Interval {
    name: string;
    semitones: number;
    value: number;
    constructor(name: string);
    apply(note: Note): Note;
    static fromSemitones(semitones: number): Interval[];
    static fromValue(value: number): Interval[];
    static fromSemitonesAndValue(semitones: number, value: number): Interval | undefined;
    static getSemitones(name: keyof typeof INTERVALS): number;
    static apply(note: Note, name: keyof typeof INTERVALS): Note;
    static getValue(name: keyof typeof INTERVALS): number;
    static fromName(name: string): Interval;
    static equals(interval1: Interval, interval2: Interval): boolean;
}
export {};
