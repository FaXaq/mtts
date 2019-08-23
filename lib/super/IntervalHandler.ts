import { Note } from '../class/Note';
import { INTERVALS, Interval } from '../class/Interval';

export class IntervalHandler {
    public compute(intervals: Interval[], note: Note): Note[] {
        let scaleIntervals = intervals;
        let notes: Note[] = [];

        for (let i = 0; i < scaleIntervals.length; i++) {
            notes.push(scaleIntervals[i].apply(note));
        }

        return notes;
    }
}