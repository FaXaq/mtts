import { Note, INTERVALS, Interval } from "..";
import { IntervalHandler } from "../super/IntervalHandler";
import { applyMixins } from "../misc/applyMixins";

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

export class Scale implements IntervalHandler {
    private _name!: string;
    private _key!: Note;
    private _notes: { [key: number] : Note } = {};

    constructor(params: IScaleParams = { key: new Note({ name: "C" }) }) {
        this.name = params.name || "major";
        this.key = params.key;
        this.notes = this.compute(SCALES[this.name].intervals, this.key);
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

    set notes(notes: { [key: string] : Note }) {
        this._notes = notes;
    }

    get notes(): { [key: string] : Note } {
        return this._notes;
    }

    // IntervalHandler mixin
    compute!:(intervals: Array<keyof typeof INTERVALS>, note: Note) => { [key: number]: Note };
}

applyMixins(Scale, [IntervalHandler]);