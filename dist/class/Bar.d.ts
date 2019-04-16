import { Rest } from "./Rest";
import { Note } from "./Note";
import { Chord } from "./Chord";
import { SCORE_STAFF } from "./Score";
import { TimeSignature } from "./TimeSignature";
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
    timeSignature: TimeSignature;
    content: Array<BAR_CONTENT>;
    staff: SCORE_STAFF;
    typeStart: BAR_TYPE_START;
    typeEnd: BAR_TYPE_END;
    autoFill: boolean;
    readonly value: number;
    readonly expectedValue: number;
    readonly emptySpace: number;
    addContent(content: BAR_CONTENT, fillEmptySpace?: boolean): void;
    modifyContent(contentIndex: number, newContent: BAR_CONTENT): BAR_CONTENT | null;
    fillEmptySpace(): void;
    isFull(): boolean;
    static fillEmptySpace(bar: Bar): void;
    static isFull(bar: Bar): boolean;
    static isBarContent(content: any): boolean;
}
