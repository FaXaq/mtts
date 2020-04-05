import { IValuedBarContentParams, ValuedBarContent } from '../super/ValuedBarContent';
export declare type RestParams = IValuedBarContentParams;
export declare class Rest extends ValuedBarContent {
    constructor(params?: RestParams);
    static findLargest(value: number): Rest;
}
