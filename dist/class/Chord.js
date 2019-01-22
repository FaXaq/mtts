"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = require("./Note");
const Interval_1 = require("./Interval");
const IntervalHandler_1 = require("../super/IntervalHandler");
exports.CHORDS = {
    "major": {
        "intervals": ["P1", "M3", "P5"]
    }
};
class Chord extends IntervalHandler_1.IntervalHandler {
    constructor(params = { root: new Note_1.Note({ name: "C" }) }) {
        super();
        this.root = params.root;
        this.intervals = params.intervals || exports.CHORDS.major.intervals;
        this.compute(this.intervals, this.root);
    }
    get root() {
        return this._root;
    }
    set root(root) {
        if (root instanceof Note_1.Note) {
            this._root = root;
        }
        else {
            throw new Error(`Trying to set a root for a chord, with something that is note a Note`);
        }
    }
    get intervals() {
        return this._intervals;
    }
    set intervals(intervals) {
        let t = true;
        for (let i = 0; i < intervals.length; i++) {
            if (!Interval_1.INTERVALS[intervals[i]]) {
                t = false;
                // get out when there is an interval that is not defined in INTERVALS
                break;
            }
        }
        if (!t) {
            throw new Error(`Trying to set intervals for chord, with wrong keys : ${[...intervals.keys()]}.\
            Allowed interval names : ${Object.keys(Interval_1.INTERVALS)}`);
        }
        this._intervals = intervals;
    }
    get notes() {
        return this._notes;
    }
}
exports.Chord = Chord;
