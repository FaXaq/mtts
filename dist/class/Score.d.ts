import { TimeSignature } from './TimeSignature';
import { Bar, BAR_TYPE_START, BAR_TYPE_END, BAR_CONTENT } from './Bar';
import { NOTE_VALUE } from './NoteValue';
import { Scale } from './Scale';
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
    measures?: Bar[];
    keySignature?: Scale;
    bars?: Bar[];
}
export declare class Score {
    private _ts;
    private _staff;
    private _bars;
    private _ks;
    constructor(params?: ScoreParams);
    get timeSignature(): TimeSignature;
    set timeSignature(ts: TimeSignature);
    get staff(): SCORE_STAFF;
    set staff(staff: SCORE_STAFF);
    get bars(): Bar[];
    set bars(bars: Bar[]);
    get measures(): Bar[];
    set measures(measures: Bar[]);
    get keySignature(): Scale;
    set keySignature(scale: Scale);
    get defaultNoteValue(): NOTE_VALUE;
    get lastBar(): Bar;
    /**
     * Add bar to the current score.
     * @param - No field is mandatory
     */
    addBar({ typeStart, typeEnd, content }?: {
        typeStart?: BAR_TYPE_START;
        typeEnd?: BAR_TYPE_END;
        content?: BAR_CONTENT[];
    }): Bar;
    addContent(content: BAR_CONTENT): void;
    modifyContent(bar: number, contentIndex: number, newContent: BAR_CONTENT): void;
}
