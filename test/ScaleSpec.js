'use strict'
var it = require('mocha').it
var describe = require('mocha').describe
var expect = require('chai').expect
var index = require('../dist/index.js')
var Scale = index.Scale
var Note = index.Note

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

  describe('Generate chords', () => {
    it('Should generate default 7th chords from the current scale', () => {
      const s = new Scale()
      expect(s.scaleChords.length).to.equal(7)
    })
  })
})
