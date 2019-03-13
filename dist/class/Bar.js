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
        // setup autofill parameter before content assignation to prevent first autofill
        if (params.autoFill !== undefined)
            this.autoFill = params.autoFill;
        this.timeSignature = params.timeSignature || new TimeSignature_1.TimeSignature();
        this.content = params.content || [];
        this.staff = params.staff || Score_1.SCORE_STAFF.TREBLE;
        this.typeStart = params.typeStart || BAR_TYPE_START.STANDARD;
        this.typeEnd = params.typeEnd || BAR_TYPE_END.STANDARD;
        if (this.autoFill)
            this.fillEmptySpace();
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
        // reset content
        this._content = [];
        for (let i = 0; i < content.length; i++) {
            this.addContent(content[i], false);
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
    // get the current value of bar
    get value() {
        let barValue = 0;
        for (let i = 0; i < this.content.length; i++) {
            barValue += this.content[i].value;
        }
        return barValue;
    }
    // get expected bar value
    get expectedValue() {
        return this.timeSignature.beatsType / this.timeSignature.beats;
    }
    // get remaining empty space in bar
    get emptySpace() {
        return this.expectedValue - this.value;
    }
    addContent(content, fillEmptySpace = true) {
        if (this.isFull()) {
            throw new Error(`Trying to add content to a bar that is already full. Try modifyContent instead.`);
        }
        if (Bar.isBarContent(content)) {
            if (content.value <= this.emptySpace) {
                this._content.push(content);
            }
            else {
                throw new Error(`Trying to add a content with a note value greater than the remaining space in bar. ${content}`);
            }
        }
        else {
            throw new Error(`Trying to add a content to a bar that either is not a Note, Chord or Rest or : ${content}`);
        }
        // auto fill empty space in bar
        if (this.autoFill && fillEmptySpace) {
            this.fillEmptySpace();
        }
    }
    // return old content
    modifyContent(contentIndex, newContent) {
        if (this.content[contentIndex] !== undefined) {
            // modify it
            this.content[contentIndex] = newContent;
            this.content.splice(contentIndex + 1);
            console.log(this.content);
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
    // fill empty space with rests
    static fillEmptySpace(bar) {
        if (bar.isFull())
            return;
        // when the bar is not full, fill it with the greater rests starting from the end
        let rests = [];
        // calculate sum of rests note_values
        let restsValue = rests.map(r => r.value).reduce((p, r) => p + r, 0);
        // while there is remaining space in bar + rests
        while (restsValue < bar.emptySpace) {
            // add largest possible rest
            rests.unshift(Rest_1.Rest.findLargest(bar.emptySpace - restsValue));
            restsValue = rests.map(r => r.value).reduce((p, r) => p + r, 0);
        }
        for (let i = 0; i < rests.length; i++) {
            // add each rest without triggering autoFill
            bar.addContent(rests[i], false);
        }
    }
    static isFull(bar) {
        return bar.value === bar.expectedValue;
    }
    static isBarContent(content) {
        return content instanceof Note_1.Note ||
            content instanceof Rest_1.Rest ||
            content instanceof Chord_1.Chord;
    }
}
exports.Bar = Bar;
