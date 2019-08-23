import { Note } from "./Note";
import { Interval } from "./Interval";
import { IntervalHandler } from "../super/IntervalHandler";
import { Chord } from "./Chord";
interface IScale {
    intervals: Interval[];
}
export declare const SCALES: {
    [key: string]: IScale;
};
interface IScaleParams {
    name?: string;
    key: Note;
}
export declare class Scale implements IntervalHandler {
    private _name;
    private _key;
    private _notes;
    constructor(params?: IScaleParams);
    name: string;
    key: Note;
    notes: Note[];
    readonly scaleChords: Chord[];
    compute: (intervals: Interval[], note: Note) => Note[];
}
export {};
