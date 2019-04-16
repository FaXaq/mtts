'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Score = index.Score;
var Note = index.Note;
var TimeSignature = index.TimeSignature;
var Scale = index.Scale;
var Bar = index.Bar;
var SCORE_STAFF = index.SCORE_STAFF;

describe('Score Class', () => {
  describe('Constructor', () => {
    it('Should create a new score without any argument with default values', () => {
      let s = new Score();
      expect(s instanceof Score).to.be.true;
      expect(s.keySignature).to.be.instanceOf(Scale);
      // verify that the staff belongs to SCORE_STAFF enum
      expect(Object.values(SCORE_STAFF).indexOf(s.staff)).to.be.greaterThan(-1);
      expect(s.timeSignature instanceof TimeSignature).to.be.true;
      expect(s.bars instanceof Array).to.be.true;
      expect(typeof s.defaultNoteValue === 'number').to.be.true;
    })

    it('Should error when trying to set the staff to a non supported one', () => {
      let s = new Score();
      expect(() => { s.staff = 'G' }).to.throw();
    })

    it('Should provide measure alternative to bars', () => {
      let s = new Score();
      expect(s.measures instanceof Array).to.be.true;
      expect(() => { s.measures = [] }).to.not.throw();
    })
  })

  describe('Getters & Setters', () => {
    describe('Last Bar', () => {
      it("Should get last bar of the score (create it if none exists)", () => {
        let s = new Score();
        expect(() => { s.lastBar }).to.throw();
      })
    })
  })

  describe('Add Content', () => {
    it('Should add content to the last bar', () => {
      let s = new Score();
      expect(() => { s.addContent(new Note()) }).to.not.throw();
    })
  })
})