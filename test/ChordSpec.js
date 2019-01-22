'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Chord = index.Chord;
var CHORDS = index.CHORDS;
var Note = index.Note;
var INTERVALS = index.INTERVALS;

describe("Chord class", () => {
    describe("Constructor", () => {
        it("Should istanciate a chord without parameter, and define default values for root and intervals", () => {
            let c;
            expect(() => c = new Chord()).to.not.throw()
        })

        it("Should be able to instanciate with only root", () => {
            expect(() => new Chord({ root: new Note({ name: "A" }) })).to.not.throw()
        })
    })

    describe("Getters & Setters", () => {
        describe("Root", () => {
            it("Should be able to get root", () => {
                let c = new Chord({
                    root: new Note({
                        name: "C" 
                    })
                });
                expect(c.root).to.deep.equal(new Note({ name: "C" }))
            })

            it("Should be able to set root", () => {
                let c = new Chord()
                expect(() => c.root = new Note({ name: "A" })).to.not.throw()
            })

            it("Should check that the set root is a Note", () => {
                let c = new Chord()
                expect(() => c.root = "A").to.throw()
            })
        })

        describe("Intervals", () => {
            it("Should be able to get intervals", () => {
                let c = new Chord();
                expect(c.intervals).to.deep.equal(CHORDS.major.intervals)
            })

            it("Should be able to set intervals", () => {
                let c = new Chord();
                expect(() => c.intervals = [...Object.keys(INTERVALS)]).to.not.throw()
            })

            it("Should check that intervals are defined in INTERVALS", () => {
                let c = new Chord();
                expect(() => c.intervals = ["TEST"]).to.throw()
            })
        })

        describe("Notes", () => {
            it("Should be able to get notes", () => {
                let c = new Chord();
                expect(c.notes).to.deep.equals({
                    1: new Note({ name: "C" }),
                    3: new Note({ name: "E" }),
                    5: new Note({ name: "G" })
                })
            })
        })
    })
})