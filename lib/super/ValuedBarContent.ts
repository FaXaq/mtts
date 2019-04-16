import { NOTE_VALUE } from "../class/NoteValue";
import { DEFAULT_NOTE_VALUE } from "../class/Note";

export interface IValuedBarContentParams {
  value?: NOTE_VALUE | number;
  dots?: number;
}

export class ValuedBarContent {
  private _value!: NOTE_VALUE | number;
  private _dots!: number;

  constructor(params: IValuedBarContentParams = {}) {
    this.value = params.value || DEFAULT_NOTE_VALUE;
    this.dots = params.dots || 0;
  }

  // getters & setters
  set value(value:  NOTE_VALUE | number) {
    this._value = value;
  }

  get value(): NOTE_VALUE | number {
    return this._value;
  }

  set dots(dots: number) {
    this._dots = dots;
  }

  get dots(): number {
    return this._dots;
  }

  get dottedValue(): number {
    return this.value + (this.value / 2) * this.dots;
  }
}