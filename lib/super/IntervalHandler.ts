import { Note } from '../class/Note'
import { Interval } from '../class/Interval'

export class IntervalHandler {
  public compute (intervals: Interval[], note: Note): Note[] {
    const notes: Note[] = []

    for (let i = 0; i < intervals.length; i++) {
      notes.push(intervals[i].apply(note))
    }

    return notes
  }
}
