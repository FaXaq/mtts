import { Note } from './Note';
import { Interval } from './Interval';
import { Chord } from './Chord';
interface IScaleDefinition {
    name?: string;
    mode?: string;
    arpeggio?: boolean;
    intervals: Interval[];
}
export declare const SCALES: {
    [key: string]: IScaleDefinition;
};
interface IScaleParams {
    name?: string;
    key?: Note;
    intervals?: Interval[];
    mode?: string;
}
export declare class Scale {
    private _key;
    private _notes;
    private _intervals;
    constructor(params?: IScaleParams);
    get intervals(): Interval[];
    set intervals(intervals: Interval[]);
    get name(): string;
    set name(name: string);
    get mode(): string;
    set mode(mode: string);
    get key(): Note;
    set key(note: Note);
    set notes(notes: Note[]);
    get notes(): Note[];
    get scaleChords(): Chord[];
    static getDefintionsFromIntervals(intervals: Interval[]): IScaleDefinition[];
}
export {};
