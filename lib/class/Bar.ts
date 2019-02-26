import { Rest } from "./Rest";
import { Note } from "./Note";
import { Chord } from "./Chord";
import { SCORE_STAFF } from "./Score";
import { TimeSignature } from "./TimeSignature";

export declare type BAR_CONTENT = Note | Chord | Rest;

export enum BAR_TYPE_START {
  STANDARD = 'STANDARD',
  DOUBLE = 'DOUBLE',
  REPEAT = 'REPEAT',
  NONE = 'NONE'
}

export enum BAR_TYPE_END {
  STANDARD = 'STANDARD',
  DOUBLE = 'DOUBLE',
  END = 'END',
  REPEAT = 'REPEAT'
}

export interface IBarParams {
  timeSignature?: TimeSignature,
  content?: Array<Note | Rest | Chord>,
  staff?: SCORE_STAFF,
  typeStart?: BAR_TYPE_START,
  typeEnd?: BAR_TYPE_END,
  autoFill?: boolean
}

export class Bar {
  private _ts!: TimeSignature;
  private _content: Array<BAR_CONTENT> = [];
  private _staff!: SCORE_STAFF;
  private _typeStart!: BAR_TYPE_START;
  private _typeEnd!: BAR_TYPE_END;
  private _autoFill: boolean = true;

  constructor(params: IBarParams = {}) {
    this.timeSignature = params.timeSignature || new TimeSignature();
    this.content = params.content || [];
    this.staff = params.staff || SCORE_STAFF.TREBLE;
    this.typeStart = params.typeStart || BAR_TYPE_START.STANDARD;
    this.typeEnd = params.typeEnd || BAR_TYPE_END.STANDARD;
    if (params.autoFill !== undefined) this.autoFill = params.autoFill;

    if (this.autoFill) this.autoFill;
  }

  // getters & setters
  get timeSignature(): TimeSignature {
    return this._ts;
  }

  set timeSignature(timeSignature: TimeSignature) {
    if (timeSignature instanceof TimeSignature === false) {
      throw new Error(`Trying to set a bar Time signature with something other than a Time Signature : ${timeSignature}`);
    } else {
      this._ts = timeSignature;
    }
  }

  get content(): Array<BAR_CONTENT> {
    return this._content;
  }

  set content(content: Array<BAR_CONTENT>) {
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

  get staff(): SCORE_STAFF {
    return this._staff;
  }

  set staff(staff: SCORE_STAFF) {
    this._staff = staff;
  }

  get typeStart(): BAR_TYPE_START {
    return this._typeStart;
  }

  set typeStart(typeStart: BAR_TYPE_START) {
    this._typeStart = typeStart;
  }

  get typeEnd(): BAR_TYPE_END {
    return this._typeEnd;
  }

  set typeEnd(typeEnd: BAR_TYPE_END) {
    this._typeEnd = typeEnd;
  }

  get autoFill(): boolean {
    return this._autoFill;
  }

  set autoFill(autoFill: boolean) {
    this._autoFill = autoFill;
  }

  addContent(content: BAR_CONTENT) {
    if (Bar.isBarContent(content)) {
      this.content.push(content);
    } else {
      throw new Error(`Trying to add a content to a bar that is not a Note, Chord or Rest : ${content}`)
    }

    // auto fill empty space in bar
    if (this.autoFill) {
      this.fillEmptySpace();
    }
  }

  // return old content
  modifyContent(contentIndex: number, newContent: BAR_CONTENT): BAR_CONTENT | null {
    if (this.content[contentIndex] !== undefined) {
      // modify it

      // auto fill empty space in bar
      if (this.autoFill) {
        this.fillEmptySpace()
      }

      return this.content[contentIndex] as BAR_CONTENT;
    } else {
      throw new Error(`Trying to modify content at index : ${contentIndex} in Bar ${this} with content ${this.content}.`)
    }
  }

  fillEmptySpace() {
    Bar.fillEmptySpace(this);
  }

  isFull(): boolean {
    return Bar.isFull(this);
  }

  static fillEmptySpace(bar: Bar) {
    let barValue = Bar.getBarValue(bar);
    
  }

  static isFull(bar: Bar): boolean {
    let barValue = Bar.getBarValue(bar);
    // if measure is full do not fill it
    return barValue === (bar.timeSignature.beats / bar.timeSignature.beatsType);
  }

  static getBarValue(bar: Bar) {
    let barValue = 0;
    for (let i = 0; i < bar.content.length; i++) {
      barValue += bar.content[i].value
    }

    return barValue;
  }

  static getExpectedBarValue(bar: Bar) {
    return bar.timeSignature.beats * bar.timeSignature.beatsType;
  }

  static isBarContent(content: any): boolean {
    return content instanceof Note ||
    content instanceof Rest ||
    content instanceof Chord;
  }
}