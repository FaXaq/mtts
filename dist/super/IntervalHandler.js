"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interval_1 = require("../class/Interval");
class IntervalHandler {
    compute(intervals, note) {
        let scaleIntervals = intervals;
        let notes = {};
        for (let i = 0; i < scaleIntervals.length; i++) {
            notes[Interval_1.Interval.getValue(scaleIntervals[i])] = Interval_1.Interval.apply(note, scaleIntervals[i]);
        }
        return notes;
    }
}
exports.IntervalHandler = IntervalHandler;
