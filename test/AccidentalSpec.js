'use strict'
var describe = require('mocha').describe
var it = require('mocha').it
var expect = require('chai').expect
var index = require('../dist/index.js')
var Accidental = index.Accidental
var ACCIDENTAL = index.ACCIDENTAL
var ACCIDENTALS = index.ACCIDENTALS

describe('Accidental class', () => {
  describe('Constants', () => {
    it('Should have all Accidental names', () => {
      expect(ACCIDENTALS).to.deep.equal([
        'DOUBLE_FLAT',
        'FLAT',
        'NATURAL',
        'SHARP',
        'DOUBLE_SHARP'
      ])
    })
  })
  describe('Constructor', () => {
    it('Should check if the name is valid before creating an accidental', () => {
      expect(() => {
        new Accidental({
          semitones: -3
        })
      }).to.throw()
    })

    it('Should create an accidental if the name is valid', () => {
      expect(() => {
        new Accidental({
          semitones: ACCIDENTAL.SHARP
        })
      }).to.not.throw()
    })

    it('Should create a note with a default value of n (for natural)', () => {
      const accidental = new Accidental()
      expect(accidental.name).to.equal('NATURAL')
    })
  })

  describe('Setters', () => {
    const accidental = new Accidental({
      semitones: ACCIDENTAL.FLAT
    })

    it('Should be able to set accidental through semitones', () => {
      accidental.semitones = -2
      expect(accidental.name).to.equal('DOUBLE_FLAT')
    })
  })

  describe('Modifiers', () => {
    describe('Add Sharp', () => {
      it('Should be able to add a sharp to an existing accidental', () => {
        const accidental = new Accidental()
        expect(() => {
          accidental.addSharp()
        }).to.not.throw()
      })

      it('Should error if the accidental is already a double sharp', () => {
        const accidental = new Accidental({
          semitones: ACCIDENTAL.DOUBLE_SHARP
        })

        expect(() => {
          accidental.addSharp()
        }).to.throw()
      })
    })

    describe('Add Flat', () => {
      it('Should be able to add a flat to an existing accidental', () => {
        const accidental = new Accidental()
        expect(() => {
          accidental.addFlat()
        }).to.not.throw()
      })

      it('Should error if the accidental is already a double flat', () => {
        const accidental = new Accidental({
          semitones: ACCIDENTAL.DOUBLE_FLAT
        })

        expect(() => {
          accidental.addFlat()
        }).to.throw()
      })
    })
  })

  describe('Static', () => {
    describe('fromString', () => {
      it('Should detect accidental from string', () => {
        let accidental = Accidental.fromString('#')
        expect(accidental.semitones).to.equal(1)
        accidental = Accidental.fromString('♯')
        expect(accidental.semitones).to.equal(1)

        accidental = Accidental.fromString('𝄪')
        expect(accidental.semitones).to.equal(2)

        accidental = Accidental.fromString('b')
        expect(accidental.semitones).to.equal(-1)
        accidental = Accidental.fromString('♭')
        expect(accidental.semitones).to.equal(-1)

        accidental = Accidental.fromString('bb')
        expect(accidental.semitones).to.equal(-2)
        accidental = Accidental.fromString('𝄫')
        expect(accidental.semitones).to.equal(-2)

        accidental = Accidental.fromString('♮')
        expect(accidental.semitones).to.equal(0)
      })
    })
  })

  describe('SPN notation', () => {
    it('Should get note SPN when note is valid', () => {
      const accidental1 = new Accidental()
      expect(accidental1.SPN).to.equal('')
      const accidental2 = new Accidental({ semitones: -1 })
      expect(accidental2.SPN).to.equal('b')
      const accidental3 = new Accidental({ semitones: -2 })
      expect(accidental3.SPN).to.equal('bb')
      const accidental4 = new Accidental({ semitones: 1 })
      expect(accidental4.SPN).to.equal('#')
      const accidental5 = new Accidental({ semitones: 2 })
      expect(accidental5.SPN).to.equal('x')
    })

    it('Should error on get SPN when not provided a valid note', () => {
      expect(() => Accidental.toSPN('tartiflette')).to.throw()
      expect(() => Accidental.fromSPN('tartiflette')).to.throw()
    })

    it('Should create a not from a SPN string', () => {
      expect(Accidental.fromSPN('n')).to.deep.equal(new Accidental())
    })
  })
})
