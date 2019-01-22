import { Note, INTERVALS, Interval } from "..";
import { IntervalHandler } from "../super/IntervalHandler";

interface IScale {
    intervals: Array<keyof typeof INTERVALS>
}

export const SCALES: { [key: string] : IScale } = {
    "major": {
        "intervals": ["P1", "M2", "M3", "P4", "P5", "M6", "M7"]
    },
    "minor" : {
        "intervals": ["P1", "M2", "m3", "P4", "P5", "M6", "m7"]
    }   
}

interface IScaleParams {
    name?: string,
    key: Note
}

export class Scale extends IntervalHandler {
    private _name!: string;
    private _key!: Note;

    constructor(params: IScaleParams = { key: new Note({ name: "C" }) }) {
        super()
        this.name = params.name || "major";
        this.key = params.key;
        this.compute(SCALES[this.name].intervals, this.key);
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        if (SCALES[name]) { 
            this._name = name;
        } else {
            throw new Error(`Couldn't create scale ${name}. Available scales are "${Object.keys(SCALES)}"`);
        }
    }

    get key(): Note {
        return this._key;
    }

    set key(note: Note) {
        this._key = note;
    }

    get notes(): { [key: string] : Note } {
        return this._notes;
    }
}