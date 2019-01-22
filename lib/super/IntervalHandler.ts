import { Note } from '../class/Note';
import { SCALES } from '../class/Scale';
import { INTERVALS, Interval } from '../class/Interval';

export class IntervalHandler {
    protected _notes: { [key: number] : Note } = {};

    public compute(intervals: Array<keyof typeof INTERVALS>, note: Note) {
        let scaleIntervals = intervals;

        for (let i = 0; i < scaleIntervals.length; i++) {
            this.addNote(
                Interval.getValue(scaleIntervals[i]),
                Interval.apply(note, scaleIntervals[i])
            )
        }
    }

    public addNote(intervalValue: number, note: Note) {
        this._notes[intervalValue] = note;
    }
}