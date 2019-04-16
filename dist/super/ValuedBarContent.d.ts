import { NOTE_VALUE } from "../class/NoteValue";
export interface IValuedBarContentParams {
    value?: NOTE_VALUE | number;
    dots?: number;
}
export declare class ValuedBarContent {
    private _value;
    private _dots;
    constructor(params?: IValuedBarContentParams);
    value: NOTE_VALUE | number;
    dots: number;
    readonly dottedValue: number;
}
