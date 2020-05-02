'use strict'
var describe = require('mocha').describe
var it = require('mocha').it
var expect = require('chai').expect
var index = require('../dist/index.js')
var Interval = index.Interval
var Note = index.Note
var Pitch = index.Pitch
var Accidental = index.Accidental
var ACCIDENTAL = index.ACCIDENTAL

describe('Interval class', () => {
  describe('Constructor', () => {
    it('Should always work as interval in not an instanciable class', () => {
      expect(() => { new Interval() }).to.throw()
      expect(() => { new Interval('P1') }).to.not.throw()
      expect(() => { new Interval('A2') }).to.not.throw()
    })
  })

  describe('Static', () => {
    it('Should give intervals from semitones', () => {
      expect(Interval.fromSemitones(1).length).to.equal(2)
      expect(Interval.fromSemitones(3).length).to.equal(2)
      expect(Interval.fromSemitones(10).length).to.equal(2)
      expect(Interval.fromSemitones(12).length).to.equal(3)
    })
    it('Should give intervals from value', () => {
      expect(Interval.fromValue(1).length).to.equal(2)
      expect(Interval.fromValue(3).length).to.equal(4)
      expect(Interval.fromValue(10).length).to.equal(4)
      expect(Interval.fromValue(12).length).to.equal(3)
    })
    it('Should give interval from semitones and value', () => {
      expect(Interval.fromSemitonesAndValue(1, 1)).to.not.equal(undefined)
      expect(Interval.fromSemitonesAndValue(2, 3)).to.not.equal(undefined)
      expect(Interval.fromSemitonesAndValue(1, 12)).to.equal(undefined)
    })
  })

  describe('Get new note from interval name and initial note', () => {
    describe('Should work with a note without accidental', () => {
      it('Should work with the perfect unison', () => {
        const note1 = new Note({
          name: 'C'
        })

        const expected = new Note({
          name: 'C'
        })

        expect(Interval.apply(note1, 'P1')).to.deep.equal(expected)
      })

      it('Should work with the perfect octave', () => {
        const note1 = new Note({
          name: 'C'
        })

        const expected = new Note({
          name: 'C',
          pitch: new Pitch({
            value: 5
          })
        })

        expect(Interval.apply(note1, 'P8')).to.deep.equal(expected)
      })

      it('Should work when obtaining a note with a lesser accidental', () => {
        const note1 = new Note({
          name: 'C'
        })

        const expected = new Note({
          name: 'D',
          accidental: new Accidental({
            semitones: ACCIDENTAL.FLAT
          })
        })

        expect(Interval.apply(note1, 'm2')).to.deep.equal(expected)
      })

      it('Should work when obtaining a note with a higher', () => {
        const note1 = new Note({
          name: 'C'
        })

        const expected = new Note({
          name: 'D',
          accidental: new Accidental({
            semitones: ACCIDENTAL.SHARP
          })
        })

        expect(Interval.apply(note1, 'A2')).to.deep.equal(expected)
      })
    })

    describe('Should work with a note with accidental', () => {
      it('Should work with the perfect unison', () => {
        const note1 = new Note({
          name: 'C',
          pitch: new Pitch({
            value: 4
          }),
          accidental: new Accidental({
            semitones: 1
          })
        })

        const expected = new Note({
          name: 'C',
          pitch: new Pitch({
            value: 4
          }),
          accidental: new Accidental({
            semitones: 1
          })
        })

        expect(Interval.apply(note1, 'P1')).to.deep.equal(expected)
      })

      it('Should work with the perfect octave', () => {
        const note1 = new Note({
          name: 'C',
          pitch: new Pitch({
            value: 4
          }),
          accidental: new Accidental({
            semitones: 1
          })
        })

        const expected = new Note({
          name: 'C',
          pitch: new Pitch({
            value: 5
          }),
          accidental: new Accidental({
            semitones: 1
          })
        })

        expect(Interval.apply(note1, 'P8')).to.deep.equal(expected)
      })
    })
  })

  describe('Getters', () => {
    describe('notation', () => {
      it('Should get a notation from an interval name', () => {
        let interval = new Interval('P5')
        expect(interval.notation).to.equal('5')
        interval = new Interval('d5')
        expect(interval.notation).to.equal('-5')
        interval = new Interval('A5')
        expect(interval.notation).to.equal('+5')
        interval = new Interval('A13')
        expect(interval.notation).to.equal('+13')
        interval = new Interval('M13')
        expect(interval.notation).to.equal('13')
        interval = new Interval('m13')
        expect(interval.notation).to.equal('-13')
        interval = new Interval('d13')
        expect(interval.notation).to.equal('°13')

        expect(() => {
          Interval.notation('D23')
        }).to.throw()
      })
    })
  })
})
