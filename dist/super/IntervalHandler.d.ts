import { Note } from '../class/Note';
import { INTERVALS } from '../class/Interval';
export declare class IntervalHandler {
    compute(intervals: Array<keyof typeof INTERVALS>, note: Note): {
        [key: number]: Note;
    };
}
