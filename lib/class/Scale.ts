import { Note } from './Note'
import { Interval } from './Interval'
import { IntervalHandler } from '../super/IntervalHandler'
import { applyMixins } from '../misc/applyMixins'
import { Chord } from './Chord'

interface IScale {
  intervals: Interval[]
}

export const SCALES: { [key: string]: IScale } = {
  major: {
    intervals: [
      new Interval('P1'),
      new Interval('M2'),
      new Interval('M3'),
      new Interval('P4'),
      new Interval('P5'),
      new Interval('M6'),
      new Interval('M7')
    ]
  },
  minor: {
    intervals: [
      new Interval('P1'),
      new Interval('M2'),
      new Interval('m3'),
      new Interval('P4'),
      new Interval('P5'),
      new Interval('M6'),
      new Interval('m7')
    ]
  }
}

interface IScaleParams {
  name?: string
  key: Note
}

export class Scale implements IntervalHandler {
  private _name!: string;
  private _key!: Note;
  private _notes: Note[] = [];

  constructor (params: IScaleParams = { key: new Note({ name: 'C' }) }) {
    this.name = params.name ?? 'major'
    this.key = params.key
    this.notes = this.compute(SCALES[this.name].intervals, this.key)
  }

  get name (): string {
    return this._name
  }

  set name (name: string) {
    if (SCALES[name] !== undefined) {
      this._name = name
    } else {
      throw new Error(`Couldn't create scale ${name}. Available scales are "${Object.keys(SCALES).join(', ')}"`)
    }
  }

  get key (): Note {
    return this._key
  }

  set key (note: Note) {
    this._key = note
  }

  set notes (notes: Note[]) {
    this._notes = notes
  }

  get notes (): Note[] {
    return this._notes
  }

  // Return all 7th chords from the scale
  get scaleChords (): Chord[] {
    const chords: Chord[] = []
    for (let i = 0; i < this.notes.length; i++) {
      chords.push(
        new Chord({
          root: this.notes[i],
          notes: [
            this.notes[i],
            this.notes[(i + 2) % this.notes.length], // 3rd
            this.notes[(i + 4) % this.notes.length], // 5th
            this.notes[(i + 6) % this.notes.length] // 7th
          ]
        })
      )
    }

    return chords
  }

  // IntervalHandler mixin
  compute!: (intervals: Interval[], note: Note) => Note[];
}

applyMixins(Scale, [IntervalHandler])
