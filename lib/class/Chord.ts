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

export const TRIADS: IChordDefinition[] = [
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
        "name": "minor",
        "intervals": [
            new Interval("P1"),
            new Interval("m3"),
            new Interval("P5")
        ],
        "code": "m",
        "notation": "-"
    },
    {
        "name": "augmented",
        "intervals": [
            new Interval("P1"),
            new Interval("M3"),
            new Interval("A5")
        ],
        "code": "aug",
        "notation": "+"
    },
    {
        "name": "diminished",
        "intervals": [
            new Interval("P1"),
            new Interval("m3"),
            new Interval("d5")
        ],
        "code": "dim",
        "notation": "°"
    },
    {
        "name": "suspended2",
        "intervals": [
            new Interval("P1"),
            new Interval("M2"),
            new Interval("P5")
        ],
        "code": "sus2",
        "notation": "sus2"
    },
    {
        "name": "suspended4",
        "intervals": [
            new Interval("P1"),
            new Interval("P4"),
            new Interval("P5")
        ],
        "code": "sus4",
        "notation": "sus4"
    }
]

const ADDED_TONES: IChordDefinition[] = [
    {
        "name": "major 7th",
        "intervals": [
            new Interval("M7")
        ],
        "code": "M7",
        "notation": "M7"
    },
    {
        "name": "minor 7th",
        "intervals": [
            new Interval("m7")
        ],
        "code": "m7",
        "notation": "m7"
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
            this.intervals = params.intervals || cloneInstanceObjectArray(TRIADS[0].intervals);
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
        // Filter each triad defintion
        let possibleTriad: IChordDefinition[] = TRIADS.filter((triadDefinition: IChordDefinition) => {
            // On intervals from the current chord
            for (let i = 0; i < triadDefinition.intervals.length; i++) {
                let foundIntervals: Interval[] = this.intervals.filter((interval: Interval) => {
                    return Interval.equals(interval, triadDefinition.intervals[i])
                });

                if (foundIntervals.length === 0) {
                    return false
                }
            }
            return true
        })

        if (possibleTriad.length > 0) {
            this._definitions = possibleTriad;
            return this.root.name + possibleTriad[0].notation
        }

        throw new Error(`No name for this chord yet ${JSON.stringify(this)}`)
    }

    computeIntervals(): Interval[] {
        let intervals: Interval[] = [];

        this.notes.forEach((n: Note) => {
            // for now choosing the first result of interval from semitones
            // TODO: find algorithm to be sure semitone value is not currently in the chord
            let possibleInterval = Interval.fromSemitonesAndValue(
                Note.getSemitonesBetween(this.root, n),
                Note.getIndexDifferenceBetween(this.root, n)
            )

            if (possibleInterval !== undefined) intervals.push(possibleInterval)
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