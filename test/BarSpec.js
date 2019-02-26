'use strict';
var chai = require('chai');
var spies = require('chai-spies');
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Bar = index.Bar;
var Note = index.Note;
var Chord = index.Chord;
var Rest = index.Rest;
var TimeSignature = index.TimeSignature;
var SCORE_STAFF = index.SCORE_STAFF;
var BAR_TYPE_START = index.BAR_TYPE_START;
var BAR_TYPE_END = index.BAR_TYPE_END;

// add spies
chai.use(spies);

describe('Bar Class', () => {
  describe('Constructor', () => {
    it('Should work without parameters', () => {
      let bar = new Bar();
      expect(bar.timeSignature instanceof TimeSignature).to.be.true;
      expect(bar.content instanceof Array).to.be.true;
      expect(bar.content.length).to.be.equal(0)
      expect(Object.values(SCORE_STAFF).indexOf(bar.staff)).to.be.greaterThan(-1);
      expect(Object.values(BAR_TYPE_START).indexOf(bar.typeStart)).to.be.greaterThan(-1);
      expect(Object.values(BAR_TYPE_END).indexOf(bar.typeEnd)).to.be.greaterThan(-1);
    })
  })

  describe('Add Content', () => {
    let bar = new Bar();

    beforeEach(() => {
      bar = new Bar();
    })

    it('Should be able to add a Chord', () => {
      expect(() => {
        bar.addContent(new Chord());
      }).to.not.throw();
    })

    it('Should be able to add a Note', () => {
      expect(() => {
        bar.addContent(new Note());
      }).to.not.throw();
    })

    it('Should be able to add a Rest', () => {
      expect(() => {
        bar.addContent(new Rest());
      }).to.not.throw();
    })

    it('Should error when addind something else', () => {
      expect(() => {
        bar.addContent({});
      }).to.throw();

      expect(() => {
        bar.addContent([]);
      }).to.throw();
    })
  })

  describe('Getters & Setters', () => {
    describe('Time Signature', () => {
      it('Should get & set with error handling', () => {
        let bar = new Bar();

        expect(bar.timeSignature instanceof TimeSignature).to.be.true;
        expect(() => {
          bar.timeSignature = new TimeSignature()
        }).to.not.throw();
  
        expect(() => {
          bar.timeSignature = 'toto';
        }).to.throw()
      })
    })

    describe('Content', () => {
      it('Should get & set with error handling', () => {
        let bar = new Bar();

        expect(bar.content.length === 0).to.be.true;

        bar.content = [
          new Note(),
          new Note(),
          new Note(),
          new Note()
        ];

        expect(bar.content.length === 0).to.be.false;
        expect(bar.content.length === 4).to.be.true;

        expect(() => {
          bar.content = 'test'
        }).to.throw()
      })
    })
  })

  describe('Fill bar with rests', () => {
    it('Should know when a bar is full', () => {
      let bar = new Bar({
        autoFill: false
      });
      expect(bar.isFull()).to.be.false;
    })

    it('Should trigger fill empty space by default on setting content, modifying and adding', () => {
      let bar = new Bar()
      // create spy function
      let spy = chai.spy(bar.fillEmptySpace);
      // replace it in original object
      bar.fillEmptySpace = spy;
      // content assignement should trigger fillEmptySpace
      bar.content = []

      expect(spy).to.have.been.called.exactly(1);
      // adding content should trigger fillEmptySpace
      bar.addContent(new Note());
      expect(spy).to.have.been.called.exactly(2);
      // content modification should trigger fillEmptySpace
      bar.modifyContent(0, new Note());
      expect(spy).to.have.been.called.exactly(3);
    })

    it('Shouldn\'t trigger fill empty space on setting content, modifying and adding if autoFill false is provided at instanciation', () => {
      let bar = new Bar({
        autoFill: false
      })
      // create spy function
      let spy = chai.spy(bar.fillEmptySpace);
      // replace it in original object
      bar.fillEmptySpace = spy;
      // content assignement shouldn't trigger fillEmptySpace
      bar.content = []
      // adding content shouldn't trigger fillEmptySpace
      bar.addContent(new Note());
      // content modification shouldn't trigger fillEmptySpace
      bar.modifyContent(0, new Note());
      expect(spy).to.have.been.called.exactly(0);
    })

    it('Should fill empty space in a bar at instanciation by default', () => {
      let bar = new Bar();

      expect(bar.isFull()).to.be.true;
    })
  })

  describe('Can modify content of a bar', () => {
    it('Should error when there is no content at the index provided', () => {
      let bar = new Bar()

      expect(() => bar.modifyContent(0, new Note())).to.throw();
    })
  })
})