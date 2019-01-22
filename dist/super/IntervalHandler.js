"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interval_1 = require("../class/Interval");
class IntervalHandler {
    constructor() {
        this._notes = {};
    }
    compute(intervals, note) {
        let scaleIntervals = intervals;
        for (let i = 0; i < scaleIntervals.length; i++) {
            this.addNote(Interval_1.Interval.getValue(scaleIntervals[i]), Interval_1.Interval.apply(note, scaleIntervals[i]));
        }
    }
    addNote(intervalValue, note) {
        this._notes[intervalValue] = note;
    }
}
exports.IntervalHandler = IntervalHandler;
