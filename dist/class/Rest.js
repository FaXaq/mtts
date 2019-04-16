"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValuedBarContent_1 = require("../super/ValuedBarContent");
const NoteValue_1 = require("./NoteValue");
const __1 = require("..");
class Rest extends ValuedBarContent_1.ValuedBarContent {
    constructor(params = {}) {
        super(params);
    }
    static findLargest(value) {
        for (var i = 0; i < NoteValue_1.REVERSE_SORTED_NOTE_VALUES.length; i++) {
            if (NoteValue_1.REVERSE_SORTED_NOTE_VALUES[i] <= value) {
                return new Rest({
                    value: NoteValue_1.REVERSE_SORTED_NOTE_VALUES[i]
                });
            }
        }
        throw new Error(`Couldn't find largest rest value for ${value}. Possible Note values : ${__1.NOTE_VALUE}`);
    }
}
exports.Rest = Rest;
