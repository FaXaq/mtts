"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TimeSignature_1 = require("./TimeSignature");
const Bar_1 = require("./Bar");
const Note_1 = require("./Note");
const Scale_1 = require("./Scale");
var SCORE_STAFF;
(function (SCORE_STAFF) {
    SCORE_STAFF["TREBLE"] = "TREBLE";
    SCORE_STAFF["FRENCH_VIOLIN"] = "FRENCH_VIOLIN";
    SCORE_STAFF["BASS"] = "BASS";
    SCORE_STAFF["BARITONE_F"] = "BARITONE_F";
    SCORE_STAFF["BARITONE_C"] = "BARITONE_C";
    SCORE_STAFF["SUB_BASS"] = "SUB_BASS";
    SCORE_STAFF["ALTO"] = "ALTO";
    SCORE_STAFF["TABLATURE"] = "TABLATURE";
    SCORE_STAFF["MEZZO_SOPRANO"] = "MEZZO_SOPRANO";
    SCORE_STAFF["SOPRANO"] = "SOPRANO";
    SCORE_STAFF["NEUTRAL"] = "NEUTRAL";
})(SCORE_STAFF = exports.SCORE_STAFF || (exports.SCORE_STAFF = {}));
class Score {
    constructor(params = {}) {
        this.timeSignature = params.timeSignature || new TimeSignature_1.TimeSignature({});
        this.staff = params.staff || SCORE_STAFF.TREBLE;
        this.bars = params.measures || params.bars || [];
        this.keySignature = params.keySignature || new Scale_1.Scale({
            key: new Note_1.Note()
        });
    }
    // getters & setters
    get timeSignature() {
        return this._ts;
    }
    set timeSignature(ts) {
        this._ts = ts;
    }
    get staff() {
        return this._staff;
    }
    set staff(staff) {
        if (Object.keys(SCORE_STAFF).indexOf(staff) > -1) {
            this._staff = staff;
        }
        else {
            throw new Error(`Clef on new score can only be one of ${Object.keys(SCORE_STAFF)}, you tried to set it to : ${staff}`);
        }
    }
    get bars() {
        return this._bars;
    }
    set bars(bars) {
        this._bars = bars;
    }
    get measures() {
        return this._bars;
    }
    set measures(measures) {
        this._bars = measures;
    }
    get keySignature() {
        return this._ks;
    }
    set keySignature(scale) {
        this._ks = scale;
    }
    get defaultNoteValue() {
        return this.timeSignature.beatsType;
    }
    get lastBar() {
        if (this.bars.length === 0) {
            this.addBar(Bar_1.BAR_TYPE_START.NONE, Bar_1.BAR_TYPE_END.STANDARD);
        }
        return this.bars[this.bars.length - 1];
    }
    addBar(typeStart, typeEnd) {
        this.bars.push(new Bar_1.Bar({
            timeSignature: this.timeSignature,
            content: [],
            typeStart: typeStart || Bar_1.BAR_TYPE_START.STANDARD,
            typeEnd: typeEnd || Bar_1.BAR_TYPE_END.STANDARD,
            staff: this.staff
        }));
        return this.lastBar;
    }
    addContent(content) {
        try {
            this.lastBar.addContent(content);
        }
        catch (err) {
            // if error, it means that the bar is full, add a bar then add content to it
            this.addBar(Bar_1.BAR_TYPE_START.STANDARD, Bar_1.BAR_TYPE_END.STANDARD);
            try {
                this.lastBar.addContent(content);
            }
            catch (err) {
                throw new Error(`Trying to add content to Score. ${err}`);
            }
        }
    }
    modifyContent(bar, contentIndex, newContent) {
        try {
            if (this.bars[bar] !== undefined) {
                this.bars[bar].modifyContent(contentIndex, newContent);
            }
            else {
                throw new Error(`Trying to modify bar number ${bar} in the score. There is no bar at this index.`);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.Score = Score;
