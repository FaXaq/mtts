import { IValuedBarContentParams, ValuedBarContent } from "../super/ValuedBarContent";

export interface RestParams extends IValuedBarContentParams {
}

export class Rest extends ValuedBarContent {
  constructor(params: RestParams = {}) {
    super(params);
  }
}