import { Note, INTERVALS } from "..";
import { IntervalHandler } from "../super/IntervalHandler";
interface IScale {
    intervals: Array<keyof typeof INTERVALS>;
}
export declare const SCALES: {
    [key: string]: IScale;
};
interface IScaleParams {
    name?: string;
    key: Note;
}
export declare class Scale implements IntervalHandler {
    private _name;
    private _key;
    private _notes;
    constructor(params?: IScaleParams);
    name: string;
    key: Note;
    notes: {
        [key: string]: Note;
    };
    compute: (intervals: Array<keyof typeof INTERVALS>, note: Note) => {
        [key: number]: Note;
    };
}
export {};
