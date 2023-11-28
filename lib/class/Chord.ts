import { Note, DEFAULT_NOTE_VALUE, SEMITONES_NUMBER } from './Note'
import { Interval } from './Interval'
import { IntervalHandler } from '../super/IntervalHandler'
import { NOTE_VALUE } from './NoteValue'
import { ValuedBarContent } from '../super/ValuedBarContent'
import { applyMixins } from '../misc/applyMixins'
import { cloneInstanceObjectArray } from '../misc/utils'
import { Scale } from './Scale'

interface ITriadDefinition {
  name: string
  intervals: Interval[]
  notation: string
}

interface IPossibleTriad extends ITriadDefinition {
  missingIntervals: Interval[]
  matchingIntervals: Interval[]
}

interface IChordDefinition {
  name: string
  notation: string
  extends: ITriadDefinition
  addedTones: Interval[]
}

export const TRIADS: { [key: string]: ITriadDefinition } = {
  maj: {
    name: 'major',
    intervals: [new Interval('P1'), new Interval('M3'), new Interval('P5')],
    notation: ''
  },
  min: {
    name: 'minor',
    intervals: [new Interval('P1'), new Interval('m3'), new Interval('P5')],
    notation: '-'
  },
  aug: {
    name: 'augmented',
    intervals: [new Interval('P1'), new Interval('M3'), new Interval('A5')],
    notation: '+'
  },
  dim: {
    name: 'diminished',
    intervals: [new Interval('P1'), new Interval('m3'), new Interval('d5')],
    notation: '°'
  },
  sus2: {
    name: 'suspended2',
    intervals: [new Interval('P1'), new Interval('M2'), new Interval('P5')],
    notation: 'sus2'
  },
  sus4: {
    name: 'suspended4',
    intervals: [new Interval('P1'), new Interval('P4'), new Interval('P5')],
    notation: 'sus4'
  },
  power: {
    name: 'power',
    intervals: [new Interval('P1'), new Interval('P5')],
    notation: '5'
  }
}

export const EXTENDED_CHORDS: { [key: string]: IChordDefinition } = {
  M7: {
    addedTones: [new Interval('M7')],
    name: 'major 7',
    notation: 'M7',
    extends: TRIADS.maj
  },
  7: {
    addedTones: [new Interval('m7')],
    name: 'dominant 7',
    notation: '7',
    extends: TRIADS.maj
  },
  '-7/5b': {
    addedTones: [new Interval('m7')],
    name: 'minor 7 flat 5',
    notation: '-7/5b',
    extends: TRIADS.dim
  },
  m7: {
    addedTones: [new Interval('m7')],
    name: 'minor 7',
    notation: '-7',
    extends: TRIADS.min
  },
  '7sus4': {
    addedTones: [new Interval('m7')],
    name: 'dominant 7 sus 4',
    notation: '7sus4',
    extends: TRIADS.sus4
  },
  d7: {
    addedTones: [new Interval('d7')],
    name: 'diminished 7',
    notation: '°7',
    extends: TRIADS.dim
  },
  mM7: {
    addedTones: [new Interval('M7')],
    name: 'minor major 7',
    notation: 'mM7',
    extends: TRIADS.min
  },
  9: {
    addedTones: [new Interval('m7'), new Interval('M9')],
    name: '7(9)',
    notation: '9',
    extends: TRIADS.maj
  },
  M9: {
    addedTones: [new Interval('M7'), new Interval('M9')],
    name: 'M7(9)',
    notation: 'M9',
    extends: TRIADS.maj
  },
  min9: {
    addedTones: [new Interval('m7'), new Interval('M9')],
    name: '-7(9)',
    notation: '-9',
    extends: TRIADS.min
  },
  11: {
    addedTones: [new Interval('m7'), new Interval('M9'), new Interval('P11')],
    name: '7(11)',
    notation: '11',
    extends: TRIADS.maj
  },
  M11: {
    addedTones: [new Interval('M7'), new Interval('M9'), new Interval('P11')],
    name: 'M7(11)',
    notation: 'M11',
    extends: TRIADS.maj
  },
  m11: {
    addedTones: [new Interval('m7'), new Interval('M9'), new Interval('P11')],
    name: '-7(11)',
    notation: '-11',
    extends: TRIADS.min
  },
  13: {
    addedTones: [new Interval('m7'), new Interval('M9'), new Interval('P11'), new Interval('M13')],
    name: '7(13)',
    notation: '13',
    extends: TRIADS.maj
  },
  M13: {
    addedTones: [new Interval('M7'), new Interval('M9'), new Interval('P11'), new Interval('M13')],
    name: 'M7(13)',
    notation: 'M13',
    extends: TRIADS.maj
  },
  m13: {
    addedTones: [new Interval('m7'), new Interval('M9'), new Interval('P11'), new Interval('M13')],
    name: '-7(13)',
    notation: '-13',
    extends: TRIADS.min
  },
  6: {
    addedTones: [new Interval('M6')],
    name: 'major 6',
    notation: '6',
    extends: TRIADS.maj
  },
  min6: {
    addedTones: [new Interval('M6')],
    name: 'minor major 6',
    notation: '-6',
    extends: TRIADS.min
  }
}

function _recursiveExtendedChordCompute (
  chord: ITriadDefinition | IChordDefinition,
  addedTones: Interval[] = []
): {
    intervals: Interval[]
    addedTones: Interval[]
  } {
  if ((chord as ITriadDefinition).intervals !== undefined) {
    return {
      intervals: (chord as ITriadDefinition).intervals,
      addedTones
    }
  }

  return _recursiveExtendedChordCompute((chord as IChordDefinition).extends, [
    ...(chord as IChordDefinition).addedTones,
    ...addedTones
  ])
}

// flatten extended chords
export const COMPUTED_EXTENDED_CHORDS = Object.keys(EXTENDED_CHORDS).map(k => {
  const EXTENDED_CHORD = EXTENDED_CHORDS[k]
  // recursively compute chord, to flatten added tones & initial intervals of chord
  const { intervals, addedTones } = _recursiveExtendedChordCompute(
    EXTENDED_CHORD
  )
  return {
    ...EXTENDED_CHORD,
    intervals,
    addedTones
  }
})

declare type COMPUTED_EXTENDED_CHORD = typeof COMPUTED_EXTENDED_CHORDS[number]

interface ChordParams {
  root: Note
  intervals?: Interval[]
  value?: NOTE_VALUE
  notes?: Note[]
}

export class Chord extends ValuedBarContent implements IntervalHandler {
  private _root!: Note;
  private _intervals!: Interval[];
  private _notes: Note[] = [];
  private _definitions: ITriadDefinition[] = [];

  constructor (
    params: ChordParams = {
      root: new Note({ name: 'C' }),
      value: DEFAULT_NOTE_VALUE
    }
  ) {
    super()
    this.root = params.root
    if (params.notes !== undefined && params.notes.length > 0) {
      this.notes = params.notes
      this.value = params.value ?? DEFAULT_NOTE_VALUE
      this.intervals = this.computeIntervals()
    } else {
      this.intervals =
        params.intervals ?? cloneInstanceObjectArray(TRIADS.maj.intervals)
      this.value = params.value ?? DEFAULT_NOTE_VALUE
      this.notes = this.compute(this.intervals, this.root)
    }
  }

  get root (): Note {
    return this._root
  }

  set root (root: Note) {
    if (root instanceof Note) {
      this._root = root
    } else {
      throw new Error(
        'Trying to set a root for a chord, with something that is note a Note'
      )
    }
  }

  get intervals (): Interval[] {
    return this._intervals
  }

  set intervals (intervals: Interval[]) {
    intervals.forEach(i => {
      if (!(i instanceof Interval)) {
        throw new Error(
          `Trying to set interval for chords, but ${JSON.stringify(
            i
          )} is not an Interval.`
        )
      }
    })
    this._intervals = intervals
  }

  set notes (notes: Note[]) {
    this._notes = notes
  }

  get notes (): Note[] {
    return this._notes
  }

  get _possibleTriads (): IPossibleTriad[] {
    const triads: IPossibleTriad[] = []
    Object.keys(TRIADS).forEach(t => {
      const missingIntervals: Interval[] = []
      const matchingIntervals: Interval[] = []
      // On intervals from the current chord
      for (let i = 0; i < TRIADS[t].intervals.length; i++) {
        const foundIntervals: Interval[] = this.intervals.filter(
          (interval: Interval) => {
            return Interval.equals(interval, TRIADS[t].intervals[i])
          }
        )

        matchingIntervals.push(...foundIntervals)

        if (foundIntervals.length === 0) {
          missingIntervals.push(TRIADS[t].intervals[i])
        }
      }

      missingIntervals.filter(interval => matchingIntervals.findIndex(matchingInterval => interval.value !== matchingInterval.value) === -1)

      triads.push({
        ...TRIADS[t],
        missingIntervals,
        matchingIntervals
      })
    })

    return triads
  }

  get notation (): string {
    // Filter each triad defintion
    const possibleTriads: IPossibleTriad[] = this._possibleTriads

    // find a perfect match triad
    const perfectMatchedTriad = possibleTriads.find(
      p => p.missingIntervals.length === 0
    )

    if (perfectMatchedTriad !== undefined) {
      if (perfectMatchedTriad.intervals.length === this.notes.length) {
        this._definitions = possibleTriads
        return perfectMatchedTriad.notation
      } else {
        // it lacks a few intervals, find them and compute extended chord to find a match
        const possibleExtendedChords = this.possibleExtendedChords(perfectMatchedTriad)

        if (possibleExtendedChords.length === 0) {
          const expectedIntervals = [...this.intervals]
          const foundIntervals = [...perfectMatchedTriad.intervals]
          const missingIntervals = expectedIntervals.filter(expectedInterval => foundIntervals.findIndex(foundInterval => expectedInterval.name === foundInterval.name) === -1)
          this.noNotationYet()
          return this.addTonesToChordNotation(perfectMatchedTriad, missingIntervals)
        }

        const longestExtendedChord = possibleExtendedChords.sort((a, b) => b.addedTones.length - a.addedTones.length)[0]
        const expectedIntervals = [...this.intervals]
        const foundIntervals = [...longestExtendedChord.addedTones, ...longestExtendedChord.intervals]

        if (expectedIntervals > foundIntervals) {
          const missingIntervals = expectedIntervals.filter(expectedInterval => foundIntervals.findIndex(foundInterval => expectedInterval.name === foundInterval.name) === -1)
          return this.addTonesToChordNotation(longestExtendedChord, missingIntervals)
        }

        return longestExtendedChord.notation
      }
    }

    this.noNotationYet()

    return ''
  }

  computeNotationWithContext (scale: Scale): string {
    return ''
  }

  noNotationYet (): void {
    console.warn(`No name for this chord yet ${this.root.SPN} ${JSON.stringify(this.intervals.map(i => i.name))}`)
  }

  computeIntervals (): Interval[] {
    const intervals: Interval[] = []

    this.notes.forEach((n: Note) => {
      // for now choosing the first result of interval from semitones
      // TODO: find algorithm to be sure semitone value is not currently in the chord
      const semitonesBetweenNotes = Note.getSemitonesBetween(this.root, n)
      const possibleInterval = Interval.fromSemitonesAndValue(
        semitonesBetweenNotes < 0
          ? (semitonesBetweenNotes % SEMITONES_NUMBER) + SEMITONES_NUMBER
          : semitonesBetweenNotes,
        Note.getIndexDifferenceBetween(this.root, n)
      )

      if (possibleInterval !== undefined) intervals.push(possibleInterval)
    })
    return intervals
  }

  /**
   * There is a bit of magic in this function
   * It checks if intervals can be upped to the next octave,
   * If it's the case, it will calculate the new chord notation
   * If not, it will add tones at the end of the chord notation
   */
  addTonesToChordNotation (chordDefinition: ITriadDefinition | IChordDefinition, intervals: Interval[]): string {
    const octaveIntervals = intervals.map(i => {
      if (i.value < 8) {
        return i.raiseOctave()
      }
      return i
    })
    const sameIntervals = intervals.filter(interval => octaveIntervals.findIndex(octaveInterval => interval.name === octaveInterval.name) > -1)
    if (sameIntervals.length === 0) {
      const newIntervals = [
        ...this.intervals.filter(currentInterval => intervals.findIndex(interval => interval.name === currentInterval.name) === -1),
        ...octaveIntervals
      ]
      const newChordDefinition = new Chord({
        root: this.root.duplicate(),
        intervals: newIntervals
      })
      return newChordDefinition.notation
    }

    return `${chordDefinition.notation}${octaveIntervals.reduce((p, c) => p + `add(${c.notation})`, '')}`
  }

  addInterval (interval: Interval): Chord {
    this._intervals.push(interval)
    this.notes = this.compute(this.intervals, this.root)
    return this
  }

  possibleAddedTones (triad: ITriadDefinition): Interval[] {
    if (triad.intervals.length === this.intervals.length) {
      return []
    }

    return this.intervals.filter((i: Interval) => {
      for (let j = 0; j < triad.intervals.length; j++) {
        if (Interval.equals(i, triad.intervals[j])) {
          return false
        }
      }

      return true
    })
  }

  possibleExtendedChords (triad: ITriadDefinition): COMPUTED_EXTENDED_CHORD[] {
    const possibleAddedTones = this.possibleAddedTones(triad)
    return COMPUTED_EXTENDED_CHORDS.filter(ec => {
      if (ec.extends.name === triad.name) {
        // for each interval in extended chord definition check
        let areAllTonesMatching = true
        for (let i = 0; i < ec.addedTones.length; i++) {
          const ECAddedTone = ec.addedTones[i]
          let isAddedToneMatched = false
          for (let j = 0; j < possibleAddedTones.length; j++) {
            const addedTone = possibleAddedTones[j]
            if (ECAddedTone.name === addedTone.name) {
              isAddedToneMatched = true
              break
            }
          }
          areAllTonesMatching = areAllTonesMatching && isAddedToneMatched
        }
        return areAllTonesMatching
      }

      return false
    })
  }

  // IntervalHandler mixin
  compute!: (intervals: Interval[], note: Note) => Note[];
}

applyMixins(Chord, [IntervalHandler])
