import { Note, DEFAULT_NOTE_VALUE, SEMITONES_NUMBER } from "./Note";
import { Interval, INTERVALS } from "./Interval";
import { IntervalHandler } from "../super/IntervalHandler";
import { NOTE_VALUE } from "./NoteValue";
import { ValuedBarContent } from "../super/ValuedBarContent";
import { applyMixins } from "../misc/applyMixins";
import { cloneInstanceObjectArray } from "../misc/utils";

interface IChordDefinition {
    intervals: Interval[],
    name: string,
    code: string,
    notation: string
}

export const CHORDS: IChordDefinition[] = [
    {
        "name": "major",
        "intervals": [
            new Interval("P1"),
            new Interval("M3"),
            new Interval("P5")
        ],
        "code": "M",
        "notation": ""
    },
    {
        "name": "major 7th",
        "intervals": [
            new Interval("P1"),
            new Interval("M3"),
            new Interval("P5"),
            new Interval("M7")
        ],
        "code": "M7",
        "notation": "M7"
    },
    {
        "name": "minor",
        "intervals": [
            new Interval("P1"),
            new Interval("m3"),
            new Interval("P5")
        ],
        "code": "m",
        "notation": "-"
    }
]

interface ChordParams {
    root: Note,
    intervals?: Interval[],
    value?: NOTE_VALUE,
    notes?: Note[]
}

export class Chord extends ValuedBarContent implements IntervalHandler {
    private _root!: Note;
    private _intervals!: Interval[];
    private _notes: Note[] = [];
    private _definitions: IChordDefinition[] = [];

    constructor(params: ChordParams = { root: new Note({ name: "C" }), value: DEFAULT_NOTE_VALUE }) {
        super()
        this.root = params.root;
        if (params.notes && params.notes.length > 0) {
            this.notes = params.notes;
            this.value = params.value || DEFAULT_NOTE_VALUE;
            this.intervals = this.computeIntervals();
        } else {
            this.intervals = params.intervals || cloneInstanceObjectArray(CHORDS[0].intervals);
            this.value = params.value || DEFAULT_NOTE_VALUE;
            this.notes = this.compute(this.intervals, this.root);
        }
    }

    get root(): Note {
        return this._root;
    }

    set root(root: Note) {
        if (root instanceof Note) {
            this._root = root;
        } else {
            throw new Error(`Trying to set a root for a chord, with something that is note a Note`);
        }
    }

    get intervals(): Interval[] {
        return this._intervals;
    }

    set intervals(intervals: Interval[]) {
        intervals.forEach(i => {
            if (!(i instanceof Interval)) {
                throw new Error(`Trying to set interval for chords, but ${JSON.stringify(i)} is not an Interval.`);
            }
        })
        this._intervals = intervals;
    }

    set notes(notes: Note[]) {
        this._notes = notes;
    }

    get notes(): Note[] {
        return this._notes;
    }

    get name(): string {
        // For each chord defintion
        let possibleChordDefinitions: IChordDefinition[] =  CHORDS.filter((chordDefinition: IChordDefinition) => {
            // check if every chord instance interval
            return this.intervals.every((chordInterval: Interval) => {
                // is in the chord definition
                return chordDefinition.intervals.filter((interval: Interval) => {
                    return Interval.equals(interval, chordInterval)
                }).length > 0
            })
        });

        if (possibleChordDefinitions.length > 0) {
            this._definitions = possibleChordDefinitions;
            return this.root.name + possibleChordDefinitions[0].notation
        }

        throw new Error(`No name for this chord yet ${JSON.stringify(this)}`)
    }

    computeIntervals(): Interval[] {
        let intervals: Interval[] = [];

        this.notes.forEach((n: Note) => {
            // for now choosing the first result of interval from semitones
            // TODO: find algorithm to be sure semitone value is not currently in the chord
            intervals.push(Interval.fromSemitones(
                (Note.getSemitonesBetween(this.root, n) + SEMITONES_NUMBER ) % SEMITONES_NUMBER
            )[0]
        )
        })

        return intervals;
    }

    addInterval(interval: Interval) {
        this._intervals.push(interval);
        this.notes = this.compute(this.intervals, this.root);
    }

    // IntervalHandler mixin
    compute!:(intervals: Interval[], note: Note) => Note[];
}

applyMixins(Chord, [IntervalHandler]);