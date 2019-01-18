import { Note, INTERVALS, Interval } from "..";

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

export class Scale {
    private _name!: string;
    private _key!: Note;
    private _notes: { [key: number] : Note } = {};

    constructor(name: string = "major", key: Note = new Note({ name: "C" })) {
        this.name = name;
        this.key = key;
        this.compute();
    }

    public compute() {
        let scaleIntervals = SCALES[this.name].intervals;

        for (let i = 0; i < scaleIntervals.length; i++) {
            this.addNote(
                Interval.getValue(scaleIntervals[i]),
                Interval.apply(this.key, scaleIntervals[i])
            )
        }
    }

    public addNote(intervalValue: number, note: Note) {
        this._notes[intervalValue] = note;
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