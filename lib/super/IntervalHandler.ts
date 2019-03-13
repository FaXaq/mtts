import { Note } from '../class/Note';
import { SCALES } from '../class/Scale';
import { INTERVALS, Interval } from '../class/Interval';

export class IntervalHandler {
    public compute(intervals: Array<keyof typeof INTERVALS>, note: Note): { [key: number]: Note } {
        let scaleIntervals = intervals;
        let notes: { [key: number]: Note } = {};

        for (let i = 0; i < scaleIntervals.length; i++) {
            notes[Interval.getValue(scaleIntervals[i])] = Interval.apply(note, scaleIntervals[i]);
        }

        return notes;
    }
}