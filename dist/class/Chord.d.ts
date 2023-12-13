import { Note } from './Note';
import { Interval } from './Interval';
import { NOTE_VALUE } from './NoteValue';
import { ValuedBarContent } from '../super/ValuedBarContent';
import { Scale } from './Scale';
interface ITriadDefinition {
    key: string;
    name: string;
    intervals: Interval[];
    notation: string;
}
interface IExtendedChordDefinition {
    key: string;
    name: string;
    notation: string;
    extends: ITriadDefinition;
    addedTones: Interval[];
}
export declare const TRIADS: {
    [key: string]: ITriadDefinition;
};
export declare const EXTENDED_CHORDS: {
    [key: string]: IExtendedChordDefinition;
};
declare type IChordDefinition = ITriadDefinition | IComputedExtendedChord;
interface IComputedExtendedChord {
    key: string;
    intervals: Interval[];
    name: string;
    notation: string;
    extends: ITriadDefinition;
}
export declare const COMPUTED_EXTENDED_CHORDS: IComputedExtendedChord[];
interface ChordParams {
    root: Note;
    intervals?: Interval[];
    value?: NOTE_VALUE;
    notes?: Note[];
}
export declare class Chord extends ValuedBarContent {
    private _root;
    private _intervals;
    private _notes;
    private readonly _definitions;
    constructor(params?: ChordParams);
    get root(): Note;
    set root(root: Note);
    get intervals(): Interval[];
    set intervals(intervals: Interval[]);
    set notes(notes: Note[]);
    get notes(): Note[];
    get notation(): string;
    /**
     * Use chord semitones notation to generate chord name.
     * Each semitone within the chord is represented as a digit or X or N.
     * For reference :
     * - 0 means that this is a 0 semitone interval
     * - 1 means that this is a 1 semitone interval
     * - 2 means that this is a 1 semitones interval
     * ...
     * - X means that this is a 10 semitones interval
     * - N means that this is a 11 semitones interval
     * And it circles back to 0.
     * There is no such thing as 12 semitones interval, since there is only one semitone whithin one octave.
     * @param notation
     * @returns
     */
    static getDefinitionsFromSemitonesNotation(notation: string): Array<{
        semitonesNotation: string;
        addedTones: Interval[];
        chordDefinition: IChordDefinition;
    }>;
    static fromNotation(notation: string): Chord;
    get semitonesNotation(): string;
    computeNotationWithContext(scale: Scale): string;
    _noNotationYet(): void;
    computeIntervals(): Interval[];
    addInterval(interval: Interval): Chord;
    possibleAddedTones(triad: ITriadDefinition): Interval[];
}
export {};
