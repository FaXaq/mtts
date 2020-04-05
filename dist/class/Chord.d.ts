import { Note } from './Note';
import { Interval } from './Interval';
import { IntervalHandler } from '../super/IntervalHandler';
import { NOTE_VALUE } from './NoteValue';
import { ValuedBarContent } from '../super/ValuedBarContent';
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
    extends: ITriadDefinition | IChordDefinition;
    addedTones: Interval[];
}
export declare const TRIADS: {
    [key: string]: ITriadDefinition;
};
export declare const EXTENDED_CHORDS: {
    [key: string]: IChordDefinition;
};
export declare const COMPUTED_EXTENDED_CHORDS: {
    intervals: Interval[];
    addedTones: Interval[];
    name: string;
    notation: string;
    extends: ITriadDefinition | IChordDefinition;
}[];
declare type COMPUTED_EXTENDED_CHORD = typeof COMPUTED_EXTENDED_CHORDS[number];
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
    get root(): Note;
    set root(root: Note);
    get intervals(): Interval[];
    set intervals(intervals: Interval[]);
    set notes(notes: Note[]);
    get notes(): Note[];
    get _possibleTriads(): IPossibleTriad[];
    get notation(): string;
    computeIntervals(): Interval[];
    addInterval(interval: Interval): Chord;
    possibleAddedTones(triad: ITriadDefinition): Interval[];
    possibleExtendedChords(triad: ITriadDefinition): COMPUTED_EXTENDED_CHORD[];
    compute: (intervals: Interval[], note: Note) => Note[];
}
export {};
