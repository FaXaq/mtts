import { Note } from "./Note";
import { INTERVALS } from "./Interval";
import { IntervalHandler } from "../super/IntervalHandler";
import { NOTE_VALUE } from "./NoteValue";
interface IChords {
    intervals: Array<keyof typeof INTERVALS>;
}
export declare const CHORDS: {
    [key: string]: IChords;
};
interface ChordParams {
    root: Note;
    intervals?: Array<keyof typeof INTERVALS>;
    value: NOTE_VALUE;
}
export declare class Chord extends IntervalHandler {
    private _root;
    private _intervals;
    private _value;
    constructor(params?: ChordParams);
    root: Note;
    intervals: Array<keyof typeof INTERVALS>;
    readonly notes: {
        [key: number]: Note;
    };
    value: NOTE_VALUE;
}
export {};
