import { Note } from './Note'
import { Interval, INTERVALS } from './Interval'
import { IntervalHandler } from '../super/IntervalHandler'
import { applyMixins } from '../misc/applyMixins'
import { Chord } from './Chord'

interface IScale {
  name: string
  intervals: Interval[]
}

export const SCALES: { [key: string]: IScale } = {
  MAJOR: {
    name: 'major',
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
  MINOR: {
    name: 'minor',
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
  key?: Note
  intervals?: Interval[]
}

export class Scale implements IntervalHandler {
  private _key!: Note;
  private _notes: Note[] = [];
  private _intervals: Interval[] = [];

  constructor (params: IScaleParams = {}) {
    const key = params.key ?? new Note({ name: 'C' })
    const intervals = params.intervals ?? []
    const name = params.name ?? 'MAJOR'

    this.key = key

    if (params.intervals !== undefined && Array.isArray(intervals) && intervals.length > 0) {
      this.intervals = intervals
    } else if (SCALES[name] !== undefined) {
      console.warn('Scale built from name, not from provided intervals.')
      this.intervals = SCALES[name].intervals
    } else {
      throw new Error("Didn't provide a valid array of intervals or a valid scale name. Cannot initialize scale.")
    }
  }

  get intervals (): Interval[] {
    return this._intervals
  }

  set intervals (intervals: Interval[]) {
    if (!Array.isArray(intervals) || !intervals.every(i => i instanceof Interval)) {
      throw new Error(`Cannot assign ${JSON.stringify(intervals)} as scale intervals.`)
    }
    this._intervals = intervals
    // each time intevals changes, compute notes of the scale
    this.notes = this.compute(this.intervals, this.key)
  }

  get name (): string {
    const filteredScales = Object.keys(SCALES).filter(s => {
      const scale = SCALES[s]
      if (scale.intervals.length === this.intervals.length) {
        return scale.intervals.every((v, i) => v.name === this.intervals[i].name)
      } else {
        return false
      }
    })

    if (filteredScales.length === 0) {
      throw new Error('Cannot find a name for this scale.')
    }

    return SCALES[filteredScales[0]].name
  }

  set name (name: string) {

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

  // Return all 7th chords from the scale if it is diatonic
  get scaleChords (): Chord[] {
    const chords: Chord[] = []
    if (this.intervals.length === 7) {
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
    } else {
      console.warn('Cannot compute scale chords yet.')
    }

    return chords
  }

  // IntervalHandler mixin
  compute!: (intervals: Interval[], note: Note) => Note[];
}

applyMixins(Scale, [IntervalHandler])
