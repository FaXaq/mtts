'use strict'
var it = require('mocha').it
var describe = require('mocha').describe
var expect = require('chai').expect
var index = require('../dist/index.js')
var Scale = index.Scale
var Note = index.Note
var Interval = index.Interval

describe('Scale class', () => {
  describe('Constructor', () => {
    it('Should create a major scale without name provided', () => {
      const s = new Scale()
      expect(s.name).to.equal('major')
      expect(s.key).to.deep.equal(new Note({
        name: 'C'
      }))
      expect(s.notes.map(n => n.SPN)).to.deep.equal([
        new Note({ name: 'C' }),
        new Note({ name: 'D' }),
        new Note({ name: 'E' }),
        new Note({ name: 'F' }),
        new Note({ name: 'G' }),
        new Note({ name: 'A' }),
        new Note({ name: 'B' })
      ].map(n => n.SPN))
    })

    it('Should reject any name unknown', () => {
      expect(() => {
        new Scale({
          name: 'wat'
        })
      }).to.throw()
    })
  })

  describe('Get & Set intervals', () => {
    it('Shoule be able to provide intervals at instanciation', () => {
      let s
      const intervals = [
        new Interval('P1'),
        new Interval('m2'),
        new Interval('M3'),
        new Interval('A4'),
        new Interval('P5'),
        new Interval('m6'),
        new Interval('M7')
      ]
      expect(() => {
        s = new Scale({
          intervals: intervals
        })
      }).to.not.throw()

      expect(s.intervals).to.deep.equal(intervals)
    })

    it('Should be able to set intervals after creating it.', () => {
      const s = new Scale()
      expect(() => {
        s.intervals = [new Interval('P1'), new Interval('P5')]
      }).to.not.throw()

      expect(s.notes.map(n => n.SPN)).to.deep.equal([Note.fromSPN('C4').SPN, Note.fromSPN('G4').SPN])
    })

    it('Should refuse something other than an array of intervals.', () => {
      expect(() => {
        new Scale({ intervals: [{ 2: 'test' }] })
      }).to.throw()
    })
  })

  describe('Get & Set mode & name', () => {
    describe('setters', () => {
      it('Should create a scale from a name', () => {
        expect(new Scale({ name: 'major' })).to.deep.equal(new Scale())
      })

      it('Should be able to set a name after its creation', () => {
        // default is major
        const s = new Scale()
        s.name = 'natural_minor'
        expect(s).to.deep.equal(new Scale({ name: 'natural_minor' }))
      })

      it('Should create a scale from a mode', () => {
        expect(new Scale({ mode: 'aeolian' })).to.deep.equal(new Scale({ name: 'natural_minor' }))
      })
      it('Should be able to set a mode after its creation', () => {
        // default is ionian
        const s = new Scale()
        s.mode = 'aeolian'
        expect(s).to.deep.equal(new Scale({ name: 'natural_minor' }))
      })

      it('Should throw when name / mode is unknown', () => {
        const s = new Scale()

        expect(() => { s.name = 'tartiflette' }).to.throw()
        expect(() => { s.name = ['tartiflette'] }).to.throw()
        expect(() => { s.mode = 'tartiflette' }).to.throw()
        expect(() => { s.mode = { tartiflette: 2 } }).to.throw()
      })
    })

    describe('getters', () => {
      it('Should get a scale name', () => {
        expect(new Scale().name).to.equal('major')
        expect(new Scale().mode).to.equal('ionian')
        expect(new Scale({
          intervals: [
            new Interval('P1'),
            new Interval('M2'),
            new Interval('P4'),
            new Interval('P5'),
            new Interval('M6'),
            new Interval('M7'),
            new Interval('M3')
          ]
        }).mode).to.equal('ionian')
      })

      it('Should be able to set a name after its creation', () => {
      })

      it('Should return an empty string when definition is not found', () => {
        const s = new Scale({ intervals: [new Interval('P1'), new Interval('A2')] })
        expect(s.name).to.equal('')
        expect(s.mode).to.equal('')
      })
    })
  })

  describe('Generate chords', () => {
    it('Should generate default 7th chords from the current scale', () => {
      const s = new Scale()
      expect(s.scaleChords.length).to.equal(7)
    })
  })
})
