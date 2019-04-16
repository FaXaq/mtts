import { IValuedBarContentParams, ValuedBarContent } from "../super/ValuedBarContent";
import { REVERSE_SORTED_NOTE_VALUES } from "./NoteValue";
import { NOTE_VALUE } from "..";

export interface RestParams extends IValuedBarContentParams {
}

export class Rest extends ValuedBarContent {
  constructor(params: RestParams = {}) {
    super(params);
  }

  static findLargest(value: number) {
    for (var i = 0; i < REVERSE_SORTED_NOTE_VALUES.length; i++) {
      if (REVERSE_SORTED_NOTE_VALUES[i] <= value) {
        return new Rest({
          value: REVERSE_SORTED_NOTE_VALUES[i]
        });
      }
    }

    throw new Error(`Couldn't find largest rest value for ${value}. Possible Note values : ${NOTE_VALUE}`)
  }
}