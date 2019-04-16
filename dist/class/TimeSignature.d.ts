export declare enum BEATS_TYPE {
    WHOLE_NOTE = 1,
    HALF_NOTE = 2,
    QUARTER_NOTE = 4,
    EIGHT_NOTE = 8
}
export interface TimeSignatureParams {
    beats?: number;
    beatsType?: number;
}
export declare class TimeSignature {
    private _beats;
    private _beatsType;
    constructor(params?: TimeSignatureParams);
    beats: number;
    beatsType: number;
}
