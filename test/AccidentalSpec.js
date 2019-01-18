'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Accidental = index.Accidental;
var ACCIDENTAL = index.ACCIDENTAL;

describe("Accidental class", () => {
    describe("Constructor", () => {
        it("Should check if the name is valid before creating an accidental", () => {
            expect(() => { new Accidental({ semitones: -3 }) }).to.throw();
        })
    
        it("Should create an accidental if the name is valid", () => {
            expect(() => { new Accidental({ semitones: ACCIDENTAL.SHARP }) }).to.not.throw();
        });
    
        it("Should create a note with a default value of n (for natural)", () => {
            let accidental = new Accidental();
            expect(accidental.name).to.equal("NATURAL");
        })
    })

    describe("Setters", () => {
        let accidental = new Accidental({ 
            semitones: ACCIDENTAL.FLAT 
        });

        it("Should be able to set accidental through semitones", () => {
            accidental.semitones = -2;
            expect(accidental.name).to.equal("DOUBLE_FLAT");
        })
    })

    describe("Modifiers", () => {
        describe("Add Sharp", () => {
            it("Should be able to add a sharp to an existing accidental", () => {
                let accidental = new Accidental();
                expect(() => { accidental.addSharp() }).to.not.throw();
            })

            it("Should error if the accidental is already a double sharp", () => {
                let accidental = new Accidental({
                    semitones: ACCIDENTAL.DOUBLE_SHARP
                })

                expect(() => { accidental.addSharp() }).to.throw()
            })
        })

        describe("Add Flat", () => {
            it("Should be able to add a flat to an existing accidental", () => {
                let accidental = new Accidental();
                expect(() => { accidental.addFlat() }).to.not.throw();
            })

            it("Should error if the accidental is already a double flat", () => {
                let accidental = new Accidental({
                    semitones: ACCIDENTAL.DOUBLE_FLAT
                })

                expect(() => { accidental.addFlat() }).to.throw()
            })
        })
    })
})