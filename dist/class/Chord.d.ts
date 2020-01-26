import { Note } from "./Note";
import { Interval } from "./Interval";
import { IntervalHandler } from "../super/IntervalHandler";
import { NOTE_VALUE } from "./NoteValue";
import { ValuedBarContent } from "../super/ValuedBarContent";
interface ITriadDefinition {
    name: string;
    intervals: Interval[];
    notation: string;
}
interface IPossibleTriad extends ITriadDefinition {
    missingIntervals: Interval[];
}
interface IChordDefinition {
    name: string;
    notation: string;
    extends: ITriadDefinition;
    addedTones: Interval[];
}
export declare const TRIADS: {
    [key: string]: ITriadDefinition;
};
export declare const CHORDS: {
    [key: string]: IChordDefinition;
};
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
    readonly _possibleTriads: IPossibleTriad[];
    readonly name: string;
    computeIntervals(): Interval[];
    addInterval(interval: Interval): void;
    possibleAddedTones(triad: ITriadDefinition): Interval[];
    compute: (intervals: Interval[], note: Note) => Note[];
}
export {};
