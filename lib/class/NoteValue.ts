export enum NOTE_VALUE {
  LARGE = 8,
  LONG = 4,
  DOUBLE_WHOLE = 2,
  WHOLE = 1,
  HALF = 1/2,
  QUARTER = 1/4,
  EIGHT = 1/8,
  SIXTEENTH = 1/16,
  THIRTY_SECOND = 1/32,
  SIXY_FOURTH = 1/64,
  HUNDRED_TWENTY_EIGHTH = 1/128,
  TWO_HUNDRED_FIFTY_SIXTH = 1/256
}

export const SORTED_NOTE_VALUES = Object.keys(NOTE_VALUE).filter(v => !isNaN(parseInt(v))).map(v => parseFloat(v)).sort();
export const REVERSE_SORTED_NOTE_VALUES = SORTED_NOTE_VALUES.reverse();