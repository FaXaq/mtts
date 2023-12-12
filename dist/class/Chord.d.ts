import { Note } from './Note';
import { Interval } from './Interval';
import { IntervalHandler } from '../super/IntervalHandler';
import { NOTE_VALUE } from './NoteValue';
import { ValuedBarContent } from '../super/ValuedBarContent';
import { Scale } from './Scale';
interface ITriadDefinition {
    name: string;
    intervals: Interval[];
    notation: string;
}
interface IPossibleTriad extends ITriadDefinition {
    missingIntervals: Interval[];
    matchingIntervals: Interval[];
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
export declare const EXTENDED_CHORDS: {
    [key: string]: IChordDefinition;
};
interface IExtendedChordDefinition {
    intervals: Interval[];
    addedTones: Interval[];
    name: string;
    notation: string;
    extends: ITriadDefinition;
}
export declare const COMPUTED_EXTENDED_CHORDS: IExtendedChordDefinition[];
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
    static fromNotation(notation: string): Chord;
    computeNotationWithContext(scale: Scale): string;
    _noNotationYet(): void;
    computeIntervals(): Interval[];
    /**
     * There is a bit of magic in this function
     * It checks if intervals can be upped to the next octave,
     * If it's the case, it will calculate the new chord notation
     * If not, it will add tones at the end of the chord notation
     */
    addTonesToChordNotation(chordDefinition: ITriadDefinition | IChordDefinition, intervals: Interval[]): string;
    addInterval(interval: Interval): Chord;
    possibleAddedTones(triad: ITriadDefinition): Interval[];
    possibleExtendedChords(triad: ITriadDefinition): COMPUTED_EXTENDED_CHORD[];
    compute: (intervals: Interval[], note: Note) => Note[];
}
export {};
