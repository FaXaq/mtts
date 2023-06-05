'use strict'
var it = require('mocha').it
var describe = require('mocha').describe
var beforeEach = require('mocha').beforeEach
var expect = require('chai').expect
var index = require('../dist/index.js')
var Note = index.Note
var Pitch = index.Pitch
var Accidental = index.Accidental
var ACCIDENTAL = index.ACCIDENTAL

describe('Note class', () => {
  describe('Constructor', () => {
    it('Should check if the name is valid before creating a note', () => {
      expect(() => { new Note({ name: 'H' }) }).to.throw()
    })

    it('Should create a note if the name is valid', () => {
      expect(() => { new Note({ name: 'A' }) }).to.not.throw()
    })

    it('Should create a note with a default pitch of 4', () => {
      const note = new Note({ name: 'A' })
      expect(note.pitch.value).to.equal(4)
    })

    it('Should accept a pitch as a second arg', () => {
      const note = new Note({
        name: 'A',
        pitch: new Pitch({
          value: 0
        })
      })

      expect(note.pitch.value).to.equal(0)
    })
  })

  describe('Modifiers', () => {
    var note

    beforeEach(() => {
      note = new Note({
        name: 'A'
      })
    })

    describe('Previous & Next', () => {
      describe('Next', () => {
        it('Should be able to change the note to the next one', () => {
          note.next()
          expect(note.name).to.equal('B')
        })

        it('Should increment the pitch when next from B to C', () => {
          note = new Note({
            name: 'B'
          })
          note.next()
          // default pitch is 4
          expect(note.name).to.equal('C')
          expect(note.pitch.value).to.equal(5)
        })
      })

      describe('Should be able to change the note to the previous one', () => {
        it('Should not error when previous from A to G', () => {
          note = new Note({
            name: 'A'
          })

          expect(() => { note.previous() }).to.not.throw()

          expect(note.name).to.equal('G')
        })

        it('Should decrement the pitch when previous from C to B', () => {
          note = new Note({
            name: 'C'
          })
          note.previous()
          // default pitch is 4
          expect(note.name).to.equal('B')
          expect(note.pitch.value).to.equal(3)
        })
      })
    })

    describe('Add an accidental', () => {
      describe('Add sharp', () => {
        it('Should add sharp to a note without accidental', () => {
          const note = new Note({
            name: 'A'
          })

          note.addSharp()

          expect(note.accidental).to.deep.equal(new Accidental({ semitones: ACCIDENTAL.SHARP }))
        })

        it('Should add sharp to a note with already an accidental', () => {
          const note = new Note({
            name: 'A',
            accidental: new Accidental({
              semitones: ACCIDENTAL.FLAT
            })
          })

          note.addSharp()

          expect(note.accidental).to.deep.equal(new Accidental({ semitones: ACCIDENTAL.NATURAL }))
        })
      })

      describe('Add flat', () => {
        it('Should add flat to a note without accidental', () => {
          const note = new Note({
            name: 'A'
          })

          note.addFlat()

          expect(note.accidental).to.deep.equal(new Accidental({ semitones: ACCIDENTAL.FLAT }))
        })

        it('Should add flat to a note with already an accidental', () => {
          const note = new Note({
            name: 'A',
            accidental: new Accidental({
              semitones: ACCIDENTAL.SHARP
            })
          })

          note.addFlat()

          expect(note.accidental).to.deep.equal(new Accidental({ semitones: ACCIDENTAL.NATURAL }))
        })
      })
    })

    it('Should be able to remove accidental', () => {
      const note1 = new Note({
        accidental: new Accidental({ semitones: -1 })
      })
      expect(note1.hasAccidental()).to.be.true
      note1.removeAccidental()
      expect(note1.hasAccidental()).to.be.false
    })

    describe('Chromatic modifiers', () => {
      it('Should be able to sharpen chromatically a note', () => {
        let note = new Note({ name: 'A' })
        expect(note.sharpenChromatically().SPN).to.equal('A#4')
        note = new Note({ name: 'B' })
        expect(note.sharpenChromatically().SPN).to.equal('C5')
        note = new Note({ name: 'A', accidental: new Accidental({ semitones: 1 }) })
        expect(note.sharpenChromatically().SPN).to.equal('B4')
        note = new Note({ name: 'A', accidental: new Accidental({ semitones: -1 }) })
        expect(note.sharpenChromatically().SPN).to.equal('A4')
        note = new Note({ name: 'B', accidental: new Accidental({ semitones: 1 }) })
        expect(note.sharpenChromatically().SPN).to.equal('C#5')
        note = new Note({ name: 'B' })
        expect(note.sharpenChromatically(4).SPN).to.equal('D#5')
      })

      it('Should be able to flatten chromatically a note', () => {
        let note = new Note({ name: 'A' })
        expect(note.flattenChromatically().SPN).to.equal('Ab4')
        note = new Note({ name: 'C' })
        expect(note.flattenChromatically().SPN).to.equal('B3')
        note = new Note({ name: 'A', accidental: new Accidental({ semitones: 1 }) })
        expect(note.flattenChromatically().SPN).to.equal('A4')
        note = new Note({ name: 'A', accidental: new Accidental({ semitones: -1 }) })
        expect(note.flattenChromatically().SPN).to.equal('G4')
        note = new Note({ name: 'B', accidental: new Accidental({ semitones: 1 }) })
        expect(note.flattenChromatically().SPN).to.equal('B4')
        note = new Note({ name: 'F', accidental: new Accidental({ semitones: -1 }) })
        expect(note.flattenChromatically().SPN).to.equal('Eb4')
        note = new Note({ name: 'A' })
        expect(note.flattenChromatically(2).SPN).to.equal('G4')
      })
    })
  })

  describe('Information', () => {
    describe('Semitones between two notes (note1, note2)', () => {
      describe('note2 > note1', () => {
        it('Should retrieve semitones between two notes of the same pitch', () => {
          const note1 = new Note({
            name: 'C'
          })
          const note2 = new Note({
            name: 'D'
          })

          expect(Note.getSemitonesBetween(note1, note2)).to.equal(2)
        })

        it('Should retrieve semitones between two notes of different pitch', () => {
          let note1 = new Note({
            name: 'C'
          })
          let note2 = new Note({
            name: 'D',
            pitch: new Pitch({
              value: 5
            })
          })

          expect(Note.getSemitonesBetween(note1, note2)).to.equal(14)

          note1 = new Note({
            name: 'C',
            pitch: new Pitch({
              value: 0
            })
          })

          note2 = new Note({
            name: 'D',
            pitch: new Pitch({
              value: 5
            })
          })

          expect(Note.getSemitonesBetween(note1, note2)).to.equal(62)
        })

        it('Should count accidentals in it', () => {
          const note1 = new Note({
            name: 'D',
            pitch: new Pitch({
              value: 4
            }),
            accidental: new Accidental({
              semitones: -2
            })
          })

          const note2 = new Note({
            name: 'C',
            pitch: new Pitch({
              value: 4
            })
          })

          expect(Note.getSemitonesBetween(note1, note2)).to.equal(0)
        })
      })

      describe('note1 > note2', () => {
        it('Should retrieve semitones between two notes of the same pitch', () => {
          const note1 = new Note({
            name: 'D'
          })
          const note2 = new Note({
            name: 'C'
          })

          expect(Note.getSemitonesBetween(note1, note2)).to.equal(-2)
        })

        it('Should retrieve semitones between two notes of different pitch', () => {
          let note1 = new Note({
            name: 'C'
          })
          let note2 = new Note({
            name: 'B',
            pitch: new Pitch({
              value: 2
            })
          })

          expect(Note.getSemitonesBetween(note1, note2)).to.equal(-13)

          note1 = new Note({
            name: 'E'
          })
          note2 = new Note({
            name: 'B',
            pitch: new Pitch({
              value: 2
            })
          })

          expect(Note.getSemitonesBetween(note1, note2)).to.equal(-17)
        })
      })
    })
  })

  describe('Checkers', () => {
    it('Should be able to check if note is a C || F OR B || E', () => {
      const note1 = new Note()
      expect(note1.isBorE()).to.be.false
      expect(note1.isCorF()).to.be.true
      const note2 = new Note({ name: 'F' })
      expect(note2.isBorE()).to.be.false
      expect(note2.isCorF()).to.be.true
    })
  })

  describe('Getters', () => {
    it('Should be able to calculate the frequency of a given note', () => {
      const note1 = new Note({ name: 'A' })
      expect(note1.frequency).to.equal(440)
    })
  })

  describe('Note index difference', () => {
    it('Should get index difference between two notes', () => {
      const note1 = new Note({
        name: 'D'
      })
      let note2 = new Note({
        name: 'E'
      })
      expect(Note.getIndexDifferenceBetween(note1, note2)).to.equal(2)
      note2 = new Note({
        name: 'B'
      })
      expect(Note.getIndexDifferenceBetween(note1, note2)).to.equal(6)
      note2 = new Note({
        name: 'C'
      })
      expect(Note.getIndexDifferenceBetween(note1, note2)).to.equal(7)
    })
  })

  describe('SPN notation', () => {
    it('Should get note SPN when note is valid', () => {
      const note1 = new Note()
      expect(note1.SPN).to.equal('C4')
      const note2 = new Note({
        name: 'A',
        accidental: new Accidental({
          semitones: -2
        })
      })
      expect(note2.SPN).to.equal('Abb4')
      const note3 = new Note({
        name: 'D',
        pitch: new Pitch({ value: 5 })
      })
      expect(note3.SPN).to.equal('D5')
    })

    it('Should error on get SPN when not provided a valid note', () => {
      expect(() => Note.toSPN('tartiflette')).to.throw()
      expect(() => Note.fromSPN('tartiflette')).to.throw()
    })

    it('Should create a not from a SPN string', () => {
      const note = new Note()
      expect(note).to.deep.equal(Note.fromSPN(note.SPN))
      const note2 = new Note({
        name: 'B',
        pitch: new Pitch({ value: 2 }),
        accidental: new Accidental({ semitones: -2 })
      })
      expect(note2).to.deep.equal(Note.fromSPN(note2.SPN))
    })
  })
})
