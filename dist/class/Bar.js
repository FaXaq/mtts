"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rest_1 = require("./Rest");
const Note_1 = require("./Note");
const Chord_1 = require("./Chord");
const Score_1 = require("./Score");
const TimeSignature_1 = require("./TimeSignature");
var BAR_TYPE_START;
(function (BAR_TYPE_START) {
    BAR_TYPE_START["STANDARD"] = "STANDARD";
    BAR_TYPE_START["DOUBLE"] = "DOUBLE";
    BAR_TYPE_START["REPEAT"] = "REPEAT";
    BAR_TYPE_START["NONE"] = "NONE";
})(BAR_TYPE_START = exports.BAR_TYPE_START || (exports.BAR_TYPE_START = {}));
var BAR_TYPE_END;
(function (BAR_TYPE_END) {
    BAR_TYPE_END["STANDARD"] = "STANDARD";
    BAR_TYPE_END["DOUBLE"] = "DOUBLE";
    BAR_TYPE_END["END"] = "END";
    BAR_TYPE_END["REPEAT"] = "REPEAT";
})(BAR_TYPE_END = exports.BAR_TYPE_END || (exports.BAR_TYPE_END = {}));
class Bar {
    constructor(params = {}) {
        this._content = [];
        this._autoFill = true;
        this.timeSignature = params.timeSignature || new TimeSignature_1.TimeSignature();
        this.content = params.content || [];
        this.staff = params.staff || Score_1.SCORE_STAFF.TREBLE;
        this.typeStart = params.typeStart || BAR_TYPE_START.STANDARD;
        this.typeEnd = params.typeEnd || BAR_TYPE_END.STANDARD;
        if (params.autoFill !== undefined)
            this.autoFill = params.autoFill;
        if (this.autoFill)
            this.autoFill;
    }
    // getters & setters
    get timeSignature() {
        return this._ts;
    }
    set timeSignature(timeSignature) {
        if (timeSignature instanceof TimeSignature_1.TimeSignature === false) {
            throw new Error(`Trying to set a bar Time signature with something other than a Time Signature : ${timeSignature}`);
        }
        else {
            this._ts = timeSignature;
        }
    }
    get content() {
        return this._content;
    }
    set content(content) {
        if (!(content instanceof Array)) {
            throw new Error(`Tying to set the content of a bar with something else than an array : ${content}`);
        }
        for (let i = 0; i < content.length; i++) {
            this.addContent(content[i]);
        }
        if (this.autoFill) {
            this.fillEmptySpace();
        }
    }
    get staff() {
        return this._staff;
    }
    set staff(staff) {
        this._staff = staff;
    }
    get typeStart() {
        return this._typeStart;
    }
    set typeStart(typeStart) {
        this._typeStart = typeStart;
    }
    get typeEnd() {
        return this._typeEnd;
    }
    set typeEnd(typeEnd) {
        this._typeEnd = typeEnd;
    }
    get autoFill() {
        return this._autoFill;
    }
    set autoFill(autoFill) {
        this._autoFill = autoFill;
    }
    addContent(content) {
        if (Bar.isBarContent(content)) {
            this.content.push(content);
        }
        else {
            throw new Error(`Trying to add a content to a bar that is not a Note, Chord or Rest : ${content}`);
        }
        // auto fill empty space in bar
        if (this.autoFill) {
            this.fillEmptySpace();
        }
    }
    // return old content
    modifyContent(contentIndex, newContent) {
        if (this.content[contentIndex] !== undefined) {
            // modify it
            // auto fill empty space in bar
            if (this.autoFill) {
                this.fillEmptySpace();
            }
            return this.content[contentIndex];
        }
        else {
            throw new Error(`Trying to modify content at index : ${contentIndex} in Bar ${this} with content ${this.content}.`);
        }
    }
    fillEmptySpace() {
        Bar.fillEmptySpace(this);
    }
    isFull() {
        return Bar.isFull(this);
    }
    static fillEmptySpace(bar) {
        let barValue = Bar.getBarValue(bar);
    }
    static isFull(bar) {
        let barValue = Bar.getBarValue(bar);
        // if measure is full do not fill it
        return barValue === (bar.timeSignature.beats / bar.timeSignature.beatsType);
    }
    static getBarValue(bar) {
        let barValue = 0;
        for (let i = 0; i < bar.content.length; i++) {
            barValue += bar.content[i].value;
        }
        return barValue;
    }
    static getExpectedBarValue(bar) {
        return bar.timeSignature.beats * bar.timeSignature.beatsType;
    }
    static isBarContent(content) {
        return content instanceof Note_1.Note ||
            content instanceof Rest_1.Rest ||
            content instanceof Chord_1.Chord;
    }
}
exports.Bar = Bar;
