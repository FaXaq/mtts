import { Note } from "./Note";
import { INTERVALS } from "./Interval";
import { IntervalHandler } from "../super/IntervalHandler";

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
    intervals?: Array<keyof typeof INTERVALS>
}

export class Chord extends IntervalHandler {
    private _root!: Note;
    private _intervals!: Array<keyof typeof INTERVALS>

    constructor(params: ChordParams = { root: new Note({ name: "C" }) }) {
        super()
        this.root = params.root;
        this.intervals = params.intervals || CHORDS.major.intervals;
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
}