import { Note, DEFAULT_NOTE_VALUE, SEMITONES_NUMBER } from "./Note";
import { Interval, INTERVALS } from "./Interval";
import { IntervalHandler } from "../super/IntervalHandler";
import { NOTE_VALUE } from "./NoteValue";
import { ValuedBarContent } from "../super/ValuedBarContent";
import { applyMixins } from "../misc/applyMixins";
import { cloneInstanceObjectArray } from "../misc/utils";

interface ITriadDefinition {
  name: string;
  intervals: Interval[];
  notation: string;
}

interface IPossibleTriad extends ITriadDefinition {
  missingIntervals: Interval[];
}

interface IChordDefinition {
  name: string;
  notation: string;
  extends: ITriadDefinition | IChordDefinition;
  addedTones: Interval[];
}

export const TRIADS: { [key: string]: ITriadDefinition } = {
  maj: {
    name: "major",
    intervals: [new Interval("P1"), new Interval("M3"), new Interval("P5")],
    notation: ""
  },
  min: {
    name: "minor",
    intervals: [new Interval("P1"), new Interval("m3"), new Interval("P5")],
    notation: "-"
  },
  aug: {
    name: "augmented",
    intervals: [new Interval("P1"), new Interval("M3"), new Interval("A5")],
    notation: "+"
  },
  dim: {
    name: "diminished",
    intervals: [new Interval("P1"), new Interval("m3"), new Interval("d5")],
    notation: "°"
  },
  sus2: {
    name: "suspended2",
    intervals: [new Interval("P1"), new Interval("M2"), new Interval("P5")],
    notation: "sus2"
  },
  sus4: {
    name: "suspended4",
    intervals: [new Interval("P1"), new Interval("P4"), new Interval("P5")],
    notation: "sus4"
  },
  power: {
    name: "power",
    intervals: [new Interval("P1"), new Interval("P5")],
    notation: "5"
  }
};

export const EXTENDED_CHORDS: { [key: string]: IChordDefinition } = {
  M7: {
    addedTones: [new Interval("M7")],
    name: "major 7",
    notation: "M7",
    extends: TRIADS.maj
  },
  7: {
    addedTones: [new Interval("m7")],
    name: "dominant 7",
    notation: "7",
    extends: TRIADS.maj
  },
  "-7/5b": {
    addedTones: [new Interval("m7")],
    name: "minor 7 flat 5",
    notation: "-7/5b",
    extends: TRIADS.dim
  },
  min7: {
    addedTones: [new Interval("m7")],
    name: "minor 7",
    notation: "-7",
    extends: TRIADS.min
  }
};

interface ChordParams {
  root: Note;
  intervals?: Interval[];
  value?: NOTE_VALUE;
  notes?: Note[];
}

export class Chord extends ValuedBarContent implements IntervalHandler {
  private _root!: Note;
  private _intervals!: Interval[];
  private _notes: Note[] = [];
  private _definitions: ITriadDefinition[] = [];

  constructor(
    params: ChordParams = {
      root: new Note({ name: "C" }),
      value: DEFAULT_NOTE_VALUE
    }
  ) {
    super();
    this.root = params.root;
    if (params.notes && params.notes.length > 0) {
      this.notes = params.notes;
      this.value = params.value || DEFAULT_NOTE_VALUE;
      this.intervals = this.computeIntervals();
    } else {
      this.intervals =
        params.intervals || cloneInstanceObjectArray(TRIADS.maj.intervals);
      this.value = params.value || DEFAULT_NOTE_VALUE;
      this.notes = this.compute(this.intervals, this.root);
    }
  }

  get root(): Note {
    return this._root;
  }

  set root(root: Note) {
    if (root instanceof Note) {
      this._root = root;
    } else {
      throw new Error(
        `Trying to set a root for a chord, with something that is note a Note`
      );
    }
  }

  get intervals(): Interval[] {
    return this._intervals;
  }

  set intervals(intervals: Interval[]) {
    intervals.forEach(i => {
      if (!(i instanceof Interval)) {
        throw new Error(
          `Trying to set interval for chords, but ${JSON.stringify(
            i
          )} is not an Interval.`
        );
      }
    });
    this._intervals = intervals;
  }

  set notes(notes: Note[]) {
    this._notes = notes;
  }

  get notes(): Note[] {
    return this._notes;
  }

  get _possibleTriads(): IPossibleTriad[] {
    const triads: IPossibleTriad[] = [];
    Object.keys(TRIADS).forEach(t => {
      const missingIntervals: Interval[] = [];
      // On intervals from the current chord
      for (let i = 0; i < TRIADS[t].intervals.length; i++) {
        let foundIntervals: Interval[] = this.intervals.filter(
          (interval: Interval) => {
            return Interval.equals(interval, TRIADS[t].intervals[i]);
          }
        );

        if (foundIntervals.length === 0) {
          missingIntervals.push(TRIADS[t].intervals[i]);
        }
      }

      triads.push({
        ...TRIADS[t],
        missingIntervals
      });
    });

    return triads;
  }

  get notation(): string {
    // Filter each triad defintion
    let possibleTriads: IPossibleTriad[] = this._possibleTriads;

    // find a perfect match triad
    let perfectMatchedTriad = possibleTriads.find(
      p => p.missingIntervals.length === 0
    );

    if (perfectMatchedTriad) {
      if (perfectMatchedTriad.intervals.length === this.notes.length) {
        this._definitions = possibleTriads;
        return perfectMatchedTriad.notation;
      } else {
        // it lacks a few intervals, find them and compute extended chord to find a match
        const possibleExtendedChords = this.possibleExtendedChords(
          perfectMatchedTriad
        );
        return possibleExtendedChords[0].notation;
      }
    } else {
      throw new Error(`No name for this chord yet ${JSON.stringify(this)}`);
    }
  }

  computeIntervals(): Interval[] {
    let intervals: Interval[] = [];

    this.notes.forEach((n: Note) => {
      // for now choosing the first result of interval from semitones
      // TODO: find algorithm to be sure semitone value is not currently in the chord
      let semitonesBetweenNotes = Note.getSemitonesBetween(this.root, n);
      let possibleInterval = Interval.fromSemitonesAndValue(
        semitonesBetweenNotes < 0
          ? (semitonesBetweenNotes % SEMITONES_NUMBER) + SEMITONES_NUMBER
          : semitonesBetweenNotes,
        Note.getIndexDifferenceBetween(this.root, n)
      );

      if (possibleInterval !== undefined) intervals.push(possibleInterval);
    });
    return intervals;
  }

  addInterval(interval: Interval) {
    this._intervals.push(interval);
    this.notes = this.compute(this.intervals, this.root);
  }

  possibleAddedTones(triad: ITriadDefinition): Interval[] {
    if (triad.intervals.length === this.intervals.length) {
      return [];
    }

    return this.intervals.filter((i: Interval) => {
      for (let j = 0; j < triad.intervals.length; j++) {
        if (Interval.equals(i, triad.intervals[j])) {
          return false;
        }
      }

      return true;
    });
  }

  possibleExtendedChords(triad: ITriadDefinition) {
    const extendedChords = Chord.extendedChordsIntervals;
    const possibleAddedTones = this.possibleAddedTones(triad);
    return extendedChords.filter(ec => {
      if (ec.extends.name == triad.name) {
        // for each interval in extended chord definition check
        for (let i = 0; i < ec.addedTones.length; i++) {
          const ECAddedTone = ec.addedTones[i];
          // if there is only one added tone not found exit
          let flag = false;
          for (let j = 0; j < possibleAddedTones.length; j++) {
            const addedTone = possibleAddedTones[j];
            if (ECAddedTone.name === addedTone.name) {
              flag = true;
              break;
            }
          }

          if (flag === false) return false;
        }
        return true;
      }

      return false;
    });
  }

  static get extendedChordsIntervals() {
    return Object.keys(EXTENDED_CHORDS).map(k => {
      const EXTENDED_CHORD = EXTENDED_CHORDS[k];
      // recursively compute chord, to flatten added tones & initial intervals of chord
      const { intervals, addedTones } = Chord.recursiveExtendedChordCompute(
        EXTENDED_CHORD
      );
      return {
        ...EXTENDED_CHORD,
        intervals,
        addedTones
      };
    });
  }

  static recursiveExtendedChordCompute(
    chord: ITriadDefinition | IChordDefinition,
    addedTones: Interval[] = []
  ): {
    intervals: Interval[];
    addedTones: Interval[];
  } {
    if ((chord as ITriadDefinition).intervals) {
      return {
        intervals: (chord as ITriadDefinition).intervals,
        addedTones
      };
    }

    return Chord.recursiveExtendedChordCompute(
      (chord as IChordDefinition).extends,
      [...(chord as IChordDefinition).addedTones, ...addedTones]
    );
  }

  // IntervalHandler mixin
  compute!: (intervals: Interval[], note: Note) => Note[];
}

applyMixins(Chord, [IntervalHandler]);
