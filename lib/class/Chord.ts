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
  extends: ITriadDefinition;
  addedTones: Interval[];
}

interface IPossibleChord extends IChordDefinition {
  missingIntervals: Interval[];
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

export const CHORDS: { [key: string]: IChordDefinition } = {
  M7: {
    addedTones: [new Interval("M7")],
    name: "M7",
    notation: "M7",
    extends: TRIADS.maj
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

  get name(): string {
    // Filter each triad defintion
    let possibleTriads: IPossibleTriad[] = this._possibleTriads;

    for (let i = 0; i < possibleTriads.length; i++) {
      console.log(
        "added tone",
        possibleTriads[i].notation,
        this.possibleAddedTones(possibleTriads[i])
      );
    }

    let perfectMatchedTriad = possibleTriads.find(
      p => p.missingIntervals.length === 0
    );

    if (possibleTriads.length > 0 && perfectMatchedTriad) {
      this._definitions = possibleTriads;
      return this.root.name + perfectMatchedTriad.notation;
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

  // IntervalHandler mixin
  compute!: (intervals: Interval[], note: Note) => Note[];
}

applyMixins(Chord, [IntervalHandler]);
