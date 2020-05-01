import { Note } from './Note'
import { Interval } from './Interval'
import { IntervalHandler } from '../super/IntervalHandler'
import { applyMixins } from '../misc/applyMixins'
import { Chord } from './Chord'

interface IScaleDefinition {
  name: string
  mode?: string
  intervals: Interval[]
}

export const SCALES: { [key: string]: IScaleDefinition } = {
  MAJOR: {
    name: 'major',
    mode: 'ionian',
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
    mode: 'aeolian',
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
  mode?: string
}

export class Scale implements IntervalHandler {
  private _key!: Note;
  private _notes: Note[] = [];
  private _intervals: Interval[] = [];

  constructor (params: IScaleParams = {}) {
    const key = params.key ?? new Note({ name: 'C' })
    const intervals = params.intervals ?? []
    const name = params.name ?? 'major'
    const mode = params.mode ?? ''

    this.key = key

    if (params.intervals !== undefined && Array.isArray(intervals) && intervals.length > 0) {
      this.intervals = intervals
    } else if (mode !== '') {
      this.mode = mode
    } else {
      this.name = name
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
    const definitions = Scale.getDefintionsFromIntervals(this.intervals)

    return definitions.length > 0 ? definitions[0].name : ''
  }

  set name (name: string) {
    const definitionName = Object.keys(SCALES).find(s => SCALES[s].name === name)

    if (definitionName !== undefined) {
      this.intervals = SCALES[definitionName].intervals
    } else {
      throw new Error(`Couldn't find a scale definition with that name : ${name}.`)
    }
  }

  get mode (): string {
    const definitions = Scale.getDefintionsFromIntervals(this.intervals)

    return definitions.length > 0 ? definitions[0].mode ?? '' : ''
  }

  set mode (mode: string) {
    const definitionName = Object.keys(SCALES).find(s => SCALES[s].mode === mode)

    if (definitionName !== undefined) {
      this.intervals = SCALES[definitionName].intervals
    } else {
      throw new Error(`Couldn't find a scale definition with that mode : ${mode}.`)
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

  static getDefintionsFromIntervals (intervals: Interval[]): IScaleDefinition[] {
    return Object.keys(SCALES).filter(s => {
      const scale = SCALES[s]
      if (scale.intervals.length === intervals.length) {
        return scale.intervals.every((v, i) => v.name === intervals[i].name)
      } else {
        return false
      }
    }).map(n => SCALES[n])
  }

  // IntervalHandler mixin
  compute!: (intervals: Interval[], note: Note) => Note[];
}

applyMixins(Scale, [IntervalHandler])
