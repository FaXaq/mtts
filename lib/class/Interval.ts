import { Note, NOTES } from './Note'

interface IInterval {
  value: number
  semitones: number
}

export const INTERVALS: { [key: string]: IInterval } = {
  P1: {
    value: 1,
    semitones: 0
  },
  d2: {
    value: 2,
    semitones: 0
  },
  m2: {
    value: 2,
    semitones: 1
  },
  A1: {
    value: 1,
    semitones: 1
  },
  M2: {
    value: 2,
    semitones: 2
  },
  d3: {
    value: 3,
    semitones: 2
  },
  m3: {
    value: 3,
    semitones: 3
  },
  A2: {
    value: 2,
    semitones: 3
  },
  M3: {
    value: 3,
    semitones: 4
  },
  d4: {
    value: 4,
    semitones: 4
  },
  P4: {
    value: 4,
    semitones: 5
  },
  A3: {
    value: 3,
    semitones: 5
  },
  d5: {
    value: 5,
    semitones: 6
  },
  A4: {
    value: 4,
    semitones: 6
  },
  P5: {
    value: 5,
    semitones: 7
  },
  d6: {
    value: 6,
    semitones: 7
  },
  m6: {
    value: 6,
    semitones: 8
  },
  A5: {
    value: 5,
    semitones: 8
  },
  M6: {
    value: 6,
    semitones: 9
  },
  d7: {
    value: 7,
    semitones: 9
  },
  m7: {
    value: 7,
    semitones: 10
  },
  A6: {
    value: 6,
    semitones: 10
  },
  M7: {
    value: 7,
    semitones: 11
  },
  d8: {
    value: 8,
    semitones: 11
  },
  P8: {
    value: 8,
    semitones: 12
  },
  A7: {
    value: 7,
    semitones: 12
  },
  d9: {
    value: 9,
    semitones: 12
  },
  m9: {
    value: 9,
    semitones: 13
  },
  A8: {
    value: 8,
    semitones: 13
  },
  M9: {
    value: 9,
    semitones: 14
  },
  d10: {
    value: 10,
    semitones: 14
  },
  m10: {
    value: 10,
    semitones: 15
  },
  A9: {
    value: 9,
    semitones: 15
  },
  M10: {
    value: 10,
    semitones: 16
  },
  d11: {
    value: 11,
    semitones: 16
  },
  A10: {
    value: 10,
    semitones: 17
  },
  P11: {
    value: 11,
    semitones: 17
  },
  d12: {
    value: 12,
    semitones: 18
  },
  A11: {
    value: 11,
    semitones: 18
  },
  P12: {
    value: 12,
    semitones: 19
  },
  d13: {
    value: 13,
    semitones: 19
  },
  m13: {
    value: 13,
    semitones: 20
  },
  A12: {
    value: 12,
    semitones: 20
  },
  M13: {
    value: 13,
    semitones: 21
  },
  d14: {
    value: 14,
    semitones: 21
  },
  m14: {
    value: 14,
    semitones: 22
  },
  A13: {
    value: 13,
    semitones: 22
  },
  M14: {
    value: 14,
    semitones: 23
  },
  d15: {
    value: 15,
    semitones: 23
  },
  P15: {
    value: 15,
    semitones: 24
  },
  A14: {
    value: 14,
    semitones: 24
  },
  A15: {
    value: 15,
    semitones: 25
  }
}

export class Interval {
  name: string;
  semitones: number;
  value: number;

  constructor (name: string) {
    if (INTERVALS[name] !== undefined) {
      this.name = name
      this.semitones = INTERVALS[name].semitones
      this.value = INTERVALS[name].value
    } else {
      throw new Error(`Interval with ${name} does not exist.`)
    }
  }

  apply (note: Note): Note {
    return Interval.apply(note, this.name)
  }

  get notation (): string {
    return Interval.notation(this.name)
  }

  static fromSemitones (semitones: number): Interval[] {
    const intervals: Interval[] = []

    Object.keys(INTERVALS).forEach((k: string) => {
      if (INTERVALS[k].semitones === semitones) {
        intervals.push(new Interval(k))
      }
    })

    return intervals
  }

  static fromValue (value: number): Interval[] {
    const intervals: Interval[] = []

    Object.keys(INTERVALS).forEach((k: string) => {
      if (INTERVALS[k].value === value) {
        intervals.push(new Interval(k))
      }
    })

    return intervals
  }

  static fromSemitonesAndValue (
    semitones: number,
    value: number
  ): Interval | undefined {
    return Interval.fromSemitones(semitones).find((interval: Interval) => {
      return interval.value % NOTES.length === value % NOTES.length
    })
  }

  static getSemitones (name: keyof typeof INTERVALS): number {
    return INTERVALS[name].semitones
  }

  static apply (note: Note, name: keyof typeof INTERVALS): Note {
    const newNote = note.duplicate()
    let intervalValue = Interval.getValue(name)

    /* skip to next note until interval value is reached */
    while (intervalValue > 1) {
      newNote.next()
      intervalValue--
    }

    /* check if new note has the correct interval semitones difference as the one requested */
    const semitonesDifference =
      Interval.getSemitones(name) - note.getSemitonesTo(newNote)

    if (semitonesDifference < 0) {
      newNote.flattenTo(semitonesDifference)
    } else if (semitonesDifference > 0) {
      newNote.sharpenTo(semitonesDifference)
    }

    return newNote
  }

  static getValue (name: keyof typeof INTERVALS): number {
    return INTERVALS[name].value
  }

  static fromName (name: string): Interval {
    return new Interval(name)
  }

  static equals (interval1: Interval, interval2: Interval): boolean {
    return interval1.name === interval2.name
  }

  static notation (name: string): string {
    if (INTERVALS[name] === undefined) {
      throw new Error(`No interval known with that name : ${name}. Cannot get its notation.`)
    }

    const [modifier, ...values] = name.split('')
    const value = values.join('')
    switch (value) {
      case '4':
      case '5':
      case '11':
      case '12':
        switch (modifier) {
          case 'd':
            return `-${value}`
          case 'A':
            return `+${value}`
          default:
            return value
        }
      default:
        switch (modifier) {
          case 'd':
            return `°${value}`
          case 'm':
            return `-${value}`
          case 'A':
            return `+${value}`
          default:
            return value
        }
    }
  }
}
