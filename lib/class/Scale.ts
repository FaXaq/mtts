import { Interval } from "./Interval";

export const scales = {
    "chromatic": {
        "intervals": ["P1","A1","M2","A2","M3","P4","A4","P5","A5","M6","A6","M7"],
        "name": "Chromatic",
    },
    "major": {
        "intervals": ["P1","M2","M3","P4","P5","M6","M7"],
        "minAlt": "maj",
        "name": "Major",
    },
    "major-pentatonic": {
        "intervals": ["P1","M2","M3","P5","M6"],
        "name": "Major Pentatonic"
    },
    "minor": {
        "intervals": ["P1","M2","m3","P4","P5","m6","m7"],
        "alt": "natural minor",
        "name": "Minor",
    },
    "blues": {
        "intervals": ["P1","M2","M3","d5","P5","M6"],
        "name": "Blues"
    },
    "minor-pentatonic": {
        "intervals": ["P1","m3","P4","P5","m7"],
        "name": "Minor Pentatonic"
    },
}

export class Scale {
    private _name!: string;
    private _intervals!: Interval[];

    constructor(name: string) {
        this.name = name;
    }

    // getters & setters
    // name
    set name(name: string) {
        this._name = name;
    }

    get name() {
        return this._name;
    }
}