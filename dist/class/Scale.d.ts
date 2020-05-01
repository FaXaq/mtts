import { Note } from './Note';
import { Interval } from './Interval';
import { IntervalHandler } from '../super/IntervalHandler';
import { Chord } from './Chord';
interface IScale {
    name: string;
    intervals: Interval[];
}
export declare const SCALES: {
    [key: string]: IScale;
};
interface IScaleParams {
    name?: string;
    key?: Note;
    intervals?: Interval[];
}
export declare class Scale implements IntervalHandler {
    private _key;
    private _notes;
    private _intervals;
    constructor(params?: IScaleParams);
    get intervals(): Interval[];
    set intervals(intervals: Interval[]);
    get name(): string;
    set name(name: string);
    get key(): Note;
    set key(note: Note);
    set notes(notes: Note[]);
    get notes(): Note[];
    get scaleChords(): Chord[];
    compute: (intervals: Interval[], note: Note) => Note[];
}
export {};
