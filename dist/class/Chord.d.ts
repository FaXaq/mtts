import { Note } from "./Note";
import { INTERVALS } from "./Interval";
import { IntervalHandler } from "../super/IntervalHandler";
interface IChords {
    intervals: Array<keyof typeof INTERVALS>;
}
export declare const CHORDS: {
    [key: string]: IChords;
};
interface ChordParams {
    root: Note;
    intervals?: Array<keyof typeof INTERVALS>;
}
export declare class Chord extends IntervalHandler {
    private _root;
    private _intervals;
    constructor(params?: ChordParams);
    root: Note;
    intervals: Array<keyof typeof INTERVALS>;
    readonly notes: {
        [key: number]: Note;
    };
}
export {};
