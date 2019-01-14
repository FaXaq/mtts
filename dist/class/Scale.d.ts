export declare const scales: {
    "chromatic": {
        "intervals": string[];
        "name": string;
    };
    "major": {
        "intervals": string[];
        "minAlt": string;
        "name": string;
    };
    "major-pentatonic": {
        "intervals": string[];
        "name": string;
    };
    "minor": {
        "intervals": string[];
        "alt": string;
        "name": string;
    };
    "blues": {
        "intervals": string[];
        "name": string;
    };
    "minor-pentatonic": {
        "intervals": string[];
        "name": string;
    };
};
export declare class Scale {
    private _name;
    private _intervals;
    constructor(name: string);
    name: string;
}
