'use strict'
var it = require('mocha').it
var describe = require('mocha').describe
var beforeEach = require('mocha').beforeEach
var expect = require('chai').expect
var index = require('../dist/index.js')
var Pitch = index.Pitch

describe('Pitch Class', () => {
  describe('Constructor', () => {
    it('Should create a pitch with a default of 4', () => {
      const pitch = new Pitch()
      expect(pitch.value).to.equal(4)
    })

    it('Should accept a number as a parameter', () => {
      const pitch = new Pitch({
        value: 5
      })
      expect(pitch.value).to.equal(5)
    })

    it('Should not accept negative integers as parameters', () => {
      expect(() => {
        new Pitch({
          value: -3
        })
      }).to.throw()
    })
  })

  describe('Inc & Dec', () => {
    let pitch

    beforeEach(() => {
      pitch = new Pitch()
    })

    describe('Inc', () => {
      it('Should be able to increment a pitch', () => {
        pitch.inc()
        expect(pitch.value).to.equal(5)
      })
    })

    describe('Dec', () => {
      it('Should be able to decrement a pitch', () => {
        pitch.dec()
        expect(pitch.value).to.equal(3)
      })

      it('Should error when the result of decrement is negative', () => {
        pitch = new Pitch({
          value: 0
        })
        expect(() => { pitch.dec() }).to.throw()
      })
    })
  })
})
