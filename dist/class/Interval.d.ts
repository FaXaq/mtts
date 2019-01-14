export interface IntervalProps {
    parent?: string;
    semitones: number;
    direct?: boolean;
    name: string;
    alt?: string[];
    altShort?: string;
    number: string;
}
export declare const intervals: {
    [key: string]: IntervalProps | any;
};
export declare class Interval {
    private _id;
    private _semitones;
    private _direct;
    private _name;
    private _alt;
    private _altShort;
    private _number;
    constructor(id: string);
    private populateProps;
    id: string;
    semitones: number;
    direct: boolean;
    name: string;
    alt: string[];
    altShort: string;
    number: string;
}
