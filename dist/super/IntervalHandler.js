"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalHandler = void 0;
class IntervalHandler {
    compute(intervals, note) {
        const notes = [];
        for (let i = 0; i < intervals.length; i++) {
            notes.push(intervals[i].apply(note));
        }
        return notes;
    }
}
exports.IntervalHandler = IntervalHandler;
