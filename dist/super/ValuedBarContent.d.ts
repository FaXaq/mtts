import { NOTE_VALUE } from '../class/NoteValue';
export interface IValuedBarContentParams {
    value?: NOTE_VALUE;
    dots?: number;
}
export declare class ValuedBarContent {
    private _value;
    private _dots;
    constructor(params?: IValuedBarContentParams);
    set value(value: NOTE_VALUE);
    get value(): NOTE_VALUE;
    set dots(dots: number);
    get dots(): number;
    get dottedValue(): number;
}
