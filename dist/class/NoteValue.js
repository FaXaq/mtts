"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REVERSE_SORTED_NOTE_VALUES = exports.SORTED_NOTE_VALUES = exports.NOTE_VALUES = void 0;
exports.NOTE_VALUES = {
    LARGE: 8,
    LONG: 4,
    DOUBLE_WHOLE: 2,
    WHOLE: 1,
    HALF: 1 / 2,
    QUARTER: 1 / 4,
    EIGHT: 1 / 8,
    SIXTEENTH: 1 / 16,
    THIRTY_SECOND: 1 / 32,
    SIXY_FOURTH: 1 / 64,
    HUNDRED_TWENTY_EIGHTH: 1 / 128,
    TWO_HUNDRED_FIFTY_SIXTH: 1 / 256
};
exports.SORTED_NOTE_VALUES = Object.keys(exports.NOTE_VALUES)
    .map(v => exports.NOTE_VALUES[v]).sort((a, b) => a - b);
exports.REVERSE_SORTED_NOTE_VALUES = exports.SORTED_NOTE_VALUES.reverse();
