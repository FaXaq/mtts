import { Note, DEFAULT_NOTE_VALUE } from "./Note";
import { INTERVALS } from "./Interval";
import { IntervalHandler } from "../super/IntervalHandler";
import { NOTE_VALUE } from "./NoteValue";

interface IChords {
    intervals: Array<keyof typeof INTERVALS>
}

export const CHORDS: { [key: string]: IChords } = {
    "major": {
        "intervals": ["P1", "M3", "P5"]
    }
}

interface ChordParams {
    root: Note,
    intervals?: Array<keyof typeof INTERVALS>,
    value: NOTE_VALUE
}

export class Chord extends IntervalHandler {
    private _root!: Note;
    private _intervals!: Array<keyof typeof INTERVALS>
    private _value!: NOTE_VALUE

    constructor(params: ChordParams = { root: new Note({ name: "C" }), value: DEFAULT_NOTE_VALUE }) {
        super()
        this.root = params.root;
        this.intervals = params.intervals || CHORDS.major.intervals;
        this.value = params.value || DEFAULT_NOTE_VALUE;
        this.compute(this.intervals, this.root);
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

    get intervals(): Array<keyof typeof INTERVALS> {
        return this._intervals;
    }

    set intervals(intervals: Array<keyof typeof INTERVALS>) {
        let t = true;
        for (let i = 0; i < intervals.length; i++) {
            if (!INTERVALS[intervals[i]]) {
                t = false;
                // get out when there is an interval that is not defined in INTERVALS
                break;
            }
        }
        
        if (!t) {
            throw new Error(`Trying to set intervals for chord, with wrong keys : ${[...intervals.keys()]}.\
            Allowed interval names : ${Object.keys(INTERVALS)}`)
        }
        
        this._intervals = intervals;
    }

    get notes(): { [key: number]: Note } {
        return this._notes;
    }

    get value(): NOTE_VALUE {
        return this._value;
    }

    set value(value: NOTE_VALUE) {
        this._value = value;
    }
}