import { Note } from "./Note";
import { Interval } from "./Interval";
import { IntervalHandler } from "../super/IntervalHandler";
import { NOTE_VALUE } from "./NoteValue";
import { ValuedBarContent } from "../super/ValuedBarContent";
interface IChordDefinition {
    intervals: Interval[];
    name: string;
    code: string;
    notation: string;
}
export declare const TRIADS: IChordDefinition[];
interface ChordParams {
    root: Note;
    intervals?: Interval[];
    value?: NOTE_VALUE;
    notes?: Note[];
}
export declare class Chord extends ValuedBarContent implements IntervalHandler {
    private _root;
    private _intervals;
    private _notes;
    private _definitions;
    constructor(params?: ChordParams);
    root: Note;
    intervals: Interval[];
    notes: Note[];
    readonly name: string;
    computeIntervals(): Interval[];
    addInterval(interval: Interval): void;
    compute: (intervals: Interval[], note: Note) => Note[];
}
export {};
