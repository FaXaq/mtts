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
export declare class Scale extends IntervalHandler {
    private _name;
    private _key;
    constructor(params?: IScaleParams);
    name: string;
    key: Note;
    readonly notes: {
        [key: string]: Note;
    };
}
export {};
