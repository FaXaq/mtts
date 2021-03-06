'use strict'
var describe = require('mocha').describe
var it = require('mocha').it
var beforeEach = require('mocha').beforeEach
var chai = require('chai')
var spies = require('chai-spies')
var expect = require('chai').expect
var index = require('../dist/index.js')
var Bar = index.Bar
var Note = index.Note
var Chord = index.Chord
var Rest = index.Rest
var TimeSignature = index.TimeSignature
var SCORE_STAFF = index.SCORE_STAFF
var BAR_TYPE_START = index.BAR_TYPE_START
var BAR_TYPE_END = index.BAR_TYPE_END
var NOTE_VALUE = index.NOTE_VALUE

// add spies
chai.use(spies)

describe('Bar Class', () => {
  describe('Constructor', () => {
    it('Should work without parameters', () => {
      const bar = new Bar({
        autoFill: false
      })
      expect(bar.timeSignature instanceof TimeSignature).to.be.true
      expect(bar.content instanceof Array).to.be.true
      expect(bar.content.length).to.be.equal(0)
      expect(Object.values(SCORE_STAFF).indexOf(bar.staff)).to.be.greaterThan(-1)
      expect(Object.values(BAR_TYPE_START).indexOf(bar.typeStart)).to.be.greaterThan(-1)
      expect(Object.values(BAR_TYPE_END).indexOf(bar.typeEnd)).to.be.greaterThan(-1)
    })
  })

  describe('Add Content', () => {
    let bar = new Bar()

    beforeEach(() => {
      bar = new Bar({
        autoFill: false
      })
    })

    it('Should be able to add a Chord', () => {
      expect(() => {
        bar.addContent(new Chord())
      }).to.not.throw()
    })

    it('Should be able to add a Note', () => {
      expect(() => {
        bar.addContent(new Note())
      }).to.not.throw()
    })

    it('Should be able to add a Rest', () => {
      expect(() => {
        bar.addContent(new Rest())
      }).to.not.throw()
    })

    it('Should error when addind something else', () => {
      expect(() => {
        bar.addContent({})
      }).to.throw()

      expect(() => {
        bar.addContent([])
      }).to.throw()
    })
  })

  describe('Getters & Setters', () => {
    describe('Time Signature', () => {
      it('Should get & set with error handling', () => {
        const bar = new Bar()

        expect(bar.timeSignature instanceof TimeSignature).to.be.true
        expect(() => {
          bar.timeSignature = new TimeSignature()
        }).to.not.throw()

        expect(() => {
          bar.timeSignature = 'toto'
        }).to.throw()
      })
    })

    describe('Content', () => {
      it('Should get & set with error handling', () => {
        const bar = new Bar({
          autoFill: false
        })

        expect(bar.content.length === 0).to.be.true

        bar.content = [
          new Note(),
          new Note(),
          new Note(),
          new Note()
        ]

        expect(bar.content.length === 0).to.be.false
        expect(bar.content.length === 4).to.be.true

        expect(() => {
          bar.content = 'test'
        }).to.throw()
      })
    })
  })

  describe('Fill bar with rests', () => {
    it('Should know when a bar is full', () => {
      const bar = new Bar({
        autoFill: false
      })

      expect(bar.isFull()).to.be.false
    })

    it('Should trigger fill empty space by default on setting content', () => {
      const bar = new Bar()
      // create spy function
      const spy = chai.spy(bar.fillEmptySpace)
      // replace it in original object
      bar.fillEmptySpace = spy
      // content assignement should trigger fillEmptySpace
      bar.content = []
      expect(spy).to.have.been.called.exactly(1)
      expect(bar.isFull()).to.be.true
    })

    it('Should trigger fill empty space by default on modifying content', () => {
      const bar = new Bar()
      // create spy function
      const spy = chai.spy(bar.fillEmptySpace)
      // replace it in original object
      bar.fillEmptySpace = spy
      // content modification should trigger fillEmptySpace
      bar.modifyContent(0, new Note())
      expect(spy).to.have.been.called.exactly(1)
      expect(bar.isFull()).to.be.true
    })

    it('Shouldn\'t trigger fill empty space on setting content, modifying and adding if autoFill false is provided at instanciation', () => {
      const bar = new Bar({
        autoFill: false
      })
      // create spy function
      const spy = chai.spy(bar.fillEmptySpace)
      // replace it in original object
      bar.fillEmptySpace = spy
      // content assignement shouldn't trigger fillEmptySpace
      bar.content = []
      // adding content shouldn't trigger fillEmptySpace
      bar.addContent(new Note())
      // content modification shouldn't trigger fillEmptySpace
      bar.modifyContent(0, new Note())
      expect(spy).to.have.been.called.exactly(0)
    })

    it('Should fill empty space in a bar at instanciation by default', () => {
      const bar = new Bar()
      expect(bar.isFull()).to.be.true
    })
  })

  describe('Add content to bar', () => {
    it('Should error when trying to add content to a bar that is already full', () => {
      const bar = new Bar()
      expect(() => bar.addContent(new Note())).to.throw()
    })

    it('Should error when trying to add not allowed content to a bar', () => {
      const bar = new Bar({
        autoFill: false
      })
      expect(() => bar.addContent(new Note({
        value: NOTE_VALUE.DOUBLE_WHOLE
      }))).to.throw()
    })

    it('Should fill empty space when asked for it', () => {
      const bar = new Bar({
        autoFill: false
      })
      // create spy function
      const spy = chai.spy(bar.fillEmptySpace)
      // replace it in original object
      bar.fillEmptySpace = spy
      bar.addContent(new Note(), true)
      expect(spy).to.have.been.called(1)
    })
  })

  describe('Can modify content of a bar', () => {
    it('Should error when there is no content at the index provided', () => {
      const bar = new Bar({
        autoFill: false
      })

      expect(() => bar.modifyContent(0, new Note())).to.throw()
    })
  })
})
