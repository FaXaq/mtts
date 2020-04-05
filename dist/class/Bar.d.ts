import { Rest } from './Rest';
import { Note } from './Note';
import { Chord } from './Chord';
import { SCORE_STAFF } from './Score';
import { TimeSignature } from './TimeSignature';
export declare type BAR_CONTENT = Note | Chord | Rest;
export declare enum BAR_TYPE_START {
    STANDARD = "STANDARD",
    DOUBLE = "DOUBLE",
    REPEAT = "REPEAT",
    NONE = "NONE"
}
export declare enum BAR_TYPE_END {
    STANDARD = "STANDARD",
    DOUBLE = "DOUBLE",
    END = "END",
    REPEAT = "REPEAT"
}
export interface IBarParams {
    timeSignature?: TimeSignature;
    content?: Array<Note | Rest | Chord>;
    staff?: SCORE_STAFF;
    typeStart?: BAR_TYPE_START;
    typeEnd?: BAR_TYPE_END;
    autoFill?: boolean;
}
export declare class Bar {
    private _ts;
    private _content;
    private _staff;
    private _typeStart;
    private _typeEnd;
    private _autoFill;
    constructor(params?: IBarParams);
    get timeSignature(): TimeSignature;
    set timeSignature(timeSignature: TimeSignature);
    get content(): BAR_CONTENT[];
    set content(content: BAR_CONTENT[]);
    get staff(): SCORE_STAFF;
    set staff(staff: SCORE_STAFF);
    get typeStart(): BAR_TYPE_START;
    set typeStart(typeStart: BAR_TYPE_START);
    get typeEnd(): BAR_TYPE_END;
    set typeEnd(typeEnd: BAR_TYPE_END);
    get autoFill(): boolean;
    set autoFill(autoFill: boolean);
    get value(): number;
    get expectedValue(): number;
    get emptySpace(): number;
    addContent(content: BAR_CONTENT, fillEmptySpace?: boolean): Bar;
    modifyContent(contentIndex: number, newContent: BAR_CONTENT): BAR_CONTENT | null;
    fillEmptySpace(): Bar;
    isFull(): boolean;
    static fillEmptySpace(bar: Bar): Bar;
    static isFull(bar: Bar): boolean;
    static isBarContent(content: any): boolean;
}
