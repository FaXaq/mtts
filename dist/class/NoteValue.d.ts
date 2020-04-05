export declare const NOTE_VALUES: {
    LARGE: number;
    LONG: number;
    DOUBLE_WHOLE: number;
    WHOLE: number;
    HALF: number;
    QUARTER: number;
    EIGHT: number;
    SIXTEENTH: number;
    THIRTY_SECOND: number;
    SIXY_FOURTH: number;
    HUNDRED_TWENTY_EIGHTH: number;
    TWO_HUNDRED_FIFTY_SIXTH: number;
};
export declare type NOTE_VALUE = typeof NOTE_VALUES[keyof typeof NOTE_VALUES];
export declare const SORTED_NOTE_VALUES: number[];
export declare const REVERSE_SORTED_NOTE_VALUES: number[];
