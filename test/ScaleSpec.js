'use strict'
var it = require('mocha').it
var chai = require('chai')
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
      expect(s.notes).to.deep.equal([
        new Note({ name: 'C' }),
        new Note({ name: 'D' }),
        new Note({ name: 'E' }),
        new Note({ name: 'F' }),
        new Note({ name: 'G' }),
        new Note({ name: 'A' }),
        new Note({ name: 'B' })
      ])
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

      expect(s.notes).to.deep.equal([Note.fromSPN('C4'), Note.fromSPN('G4')])
    })

    it('Should refuse something other than an array of intervals.', () => {
      expect(() => {
        new Scale({ intervals: [{ 2: 'test' }] })
      }).to.throw()
    })
  })

  describe('Generate chords', () => {
    it('Should generate default 7th chords from the current scale', () => {
      const s = new Scale()
      expect(s.scaleChords.length).to.equal(7)
    })
  })
})
