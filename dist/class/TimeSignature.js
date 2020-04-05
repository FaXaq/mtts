"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BEATS_TYPE;
(function (BEATS_TYPE) {
    BEATS_TYPE[BEATS_TYPE["WHOLE_NOTE"] = 1] = "WHOLE_NOTE";
    BEATS_TYPE[BEATS_TYPE["HALF_NOTE"] = 2] = "HALF_NOTE";
    BEATS_TYPE[BEATS_TYPE["QUARTER_NOTE"] = 4] = "QUARTER_NOTE";
    BEATS_TYPE[BEATS_TYPE["EIGHT_NOTE"] = 8] = "EIGHT_NOTE";
})(BEATS_TYPE = exports.BEATS_TYPE || (exports.BEATS_TYPE = {}));
class TimeSignature {
    constructor(params = {}) {
        var _a, _b;
        this.beats = (_a = params.beats) !== null && _a !== void 0 ? _a : 4;
        this.beatsType = (_b = params.beatsType) !== null && _b !== void 0 ? _b : BEATS_TYPE.QUARTER_NOTE;
    }
    // getters & setters
    set beats(beats) {
        this._beats = beats;
    }
    get beats() {
        return this._beats;
    }
    set beatsType(beatsType) {
        this._beatsType = beatsType;
    }
    get beatsType() {
        return this._beatsType;
    }
}
exports.TimeSignature = TimeSignature;
