interface PitchParams {
    value: number;
}
export declare class Pitch {
    private _value;
    constructor(params?: PitchParams);
    inc(): void;
    dec(): void;
    value: number;
}
export {};
