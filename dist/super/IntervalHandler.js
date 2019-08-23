"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IntervalHandler {
    compute(intervals, note) {
        let scaleIntervals = intervals;
        let notes = [];
        for (let i = 0; i < scaleIntervals.length; i++) {
            notes.push(scaleIntervals[i].apply(note));
        }
        return notes;
    }
}
exports.IntervalHandler = IntervalHandler;
