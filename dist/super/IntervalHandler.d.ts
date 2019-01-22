import { Note } from '../class/Note';
import { INTERVALS } from '../class/Interval';
export declare class IntervalHandler {
    protected _notes: {
        [key: number]: Note;
    };
    compute(intervals: Array<keyof typeof INTERVALS>, note: Note): void;
    addNote(intervalValue: number, note: Note): void;
}
