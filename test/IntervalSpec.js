'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Interval = index.Interval;
var Note = index.Note;
var Pitch = index.Pitch;
var Accidental = index.Accidental;

describe("Interval class", () => {
    describe("Constructor", () => {
        it("Should always work as interval in not an instanciable class", () => {
            expect(() => { new Interval() }).to.not.throw()
        })
    })

    describe("Get new note from interval name and initial note", () => {
        describe("Should work with a note without accidental", () => {
            it("Should work with the perfect unison", () => {
                let note1 = new Note({ 
                    name: "C" 
                })

                const expected = new Note({ 
                    name: "C" 
                })

                expect(Interval.getNote(note1, "P1")).to.deep.equal(expected)
            })

            it("Should work with the perfect octave", () => {
                let note1 = new Note({ 
                    name: "C"
                })

                const expected = new Note({ 
                    name: "C", 
                    pitch: new Pitch({
                        value: 5
                    })
                })

                expect(Interval.getNote(note1, "P8")).to.deep.equal(expected)
            })
        })

        describe("Should work with a note with accidental", () => {
            it("Should work with the perfect unison", () => {
                let note1 = new Note({ 
                    name: "C", 
                    pitch: new Pitch({
                        value: 4
                    }), 
                    accidental: new Accidental({ 
                        semitones: 1 
                    }) 
                })

                const expected = new Note({ 
                    name: "C", 
                    pitch: new Pitch({
                        value: 4
                    }), 
                    accidental: new Accidental({ 
                        semitones: 1 
                    }) 
                })

                expect(Interval.getNote(note1, "P1")).to.deep.equal(expected)
            })

            it("Should work with the perfect octave", () => {
                let note1 = new Note({ 
                    name: "C", 
                    pitch: new Pitch({
                        value: 4
                    }), 
                    accidental: new Accidental({ 
                        semitones: 1 
                    }) 
                })

                const expected = new Note({ 
                    name: "C", 
                    pitch: new Pitch({
                        value: 5
                    }), 
                    accidental: new Accidental({ 
                        semitones: 1 
                    }) 
                })

                expect(Interval.getNote(note1, "P8")).to.deep.equal(expected)
            })
        })
    })
})