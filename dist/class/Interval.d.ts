import { Note } from "./Note";
interface IInterval {
    value: number;
    semitones: number;
}
export declare const INTERVALS: {
    [key: string]: IInterval;
};
export declare class Interval {
    constructor();
    static getSemitones(name: keyof typeof INTERVALS): number;
    static apply(note: Note, name: keyof typeof INTERVALS): Note;
    static getValue(name: keyof typeof INTERVALS): number;
}
export {};
