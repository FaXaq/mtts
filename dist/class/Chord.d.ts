import { Note } from "./Note";
import { INTERVALS } from "./Interval";
import { IntervalHandler } from "../super/IntervalHandler";
import { NOTE_VALUE } from "./NoteValue";
import { ValuedBarContent } from "../super/ValuedBarContent";
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
export declare class Chord extends ValuedBarContent implements IntervalHandler {
    private _root;
    private _intervals;
    private _notes;
    constructor(params?: ChordParams);
    root: Note;
    intervals: Array<keyof typeof INTERVALS>;
    notes: {
        [key: number]: Note;
    };
    compute: (intervals: Array<keyof typeof INTERVALS>, note: Note) => {
        [key: number]: Note;
    };
}
export {};
