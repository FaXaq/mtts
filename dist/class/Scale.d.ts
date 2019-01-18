import { Note, INTERVALS } from "..";
interface IScale {
    intervals: Array<keyof typeof INTERVALS>;
}
export declare const SCALES: {
    [key: string]: IScale;
};
export declare class Scale {
    private _name;
    private _key;
    private _notes;
    constructor(name?: string, key?: Note);
    compute(): void;
    addNote(intervalValue: number, note: Note): void;
    name: string;
    key: Note;
    readonly notes: {
        [key: string]: Note;
    };
}
export {};
