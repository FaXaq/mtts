import { TimeSignature } from "./TimeSignature";
import { Bar, BAR_TYPE_START, BAR_TYPE_END, BAR_CONTENT } from "./Bar";
import { NOTE_VALUE } from "./NoteValue";
import { Scale } from "./Scale";
export declare enum SCORE_STAFF {
    TREBLE = "TREBLE",
    FRENCH_VIOLIN = "FRENCH_VIOLIN",
    BASS = "BASS",
    BARITONE_F = "BARITONE_F",
    BARITONE_C = "BARITONE_C",
    SUB_BASS = "SUB_BASS",
    ALTO = "ALTO",
    TABLATURE = "TABLATURE",
    MEZZO_SOPRANO = "MEZZO_SOPRANO",
    SOPRANO = "SOPRANO",
    NEUTRAL = "NEUTRAL"
}
export interface ScoreParams {
    timeSignature?: TimeSignature;
    staff?: SCORE_STAFF;
    measures?: Array<Bar>;
    keySignature?: Scale;
    bars?: Array<Bar>;
}
export declare class Score {
    private _ts;
    private _staff;
    private _bars;
    private _ks;
    constructor(params?: ScoreParams);
    timeSignature: TimeSignature;
    staff: SCORE_STAFF;
    bars: Array<Bar>;
    measures: Array<Bar>;
    keySignature: Scale;
    readonly defaultNoteValue: NOTE_VALUE;
    readonly lastBar: Bar;
    addBar(typeStart: BAR_TYPE_START, typeEnd: BAR_TYPE_END, content?: Array<BAR_CONTENT>): Bar;
    addContent(content: BAR_CONTENT): void;
    modifyContent(bar: number, contentIndex: number, newContent: BAR_CONTENT): void;
}
