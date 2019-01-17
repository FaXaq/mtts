'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Note = index.Note;
var Pitch = index.Pitch;
var Accidental = index.Accidental;

describe("Note class", () => {
    describe("Constructor", () => {
        it("Should check if the name is valid before creating a note", () => {
            expect(() => { new Note()}).to.throw();
            expect(() => { new Note("H")}).to.throw();
        })
    
        it("Should create a note if the name is valid", () => {
            expect(() => new Note("A")).to.not.throw();
        });
    
        it("Should create a note with a default pitch of 4", () => {
            let note = new Note("A");
            expect(note.pitch.value).to.equal(4);
        })
    
        it("Should accept a pitch as a second arg", () => {
            let note = new Note("A", new Pitch(0));
            expect(note.pitch.value).to.equal(0);
        })
    })

    describe("Modifiers", () => {
        var note;

        beforeEach(() => {
            note = new Note("A");
        })

        describe("Previous & Next", () => {
            describe("Next", () => {
                it("Should be able to change the note to the next one", () => {
                    note.next();
                    expect(note.name).to.equal("B");
                })

                it("Should not error when next from G to A", () => {
                    note = new Note("G");
                    expect(() => { note.next() }).to.not.throw()
                    expect(note.name).to.equal("A");
                })

                it("Should increment the pitch when next from B to C", () => {
                    note = new Note("B");
                    note.next();
                    // default pitch is 4
                    expect(note.name).to.equal("C")
                    expect(note.pitch.value).to.equal(5)
                })
            })

            describe("Should be able to change the note to the previous one", () => {
                it("Should not error when previous from A to G", () => {
                    expect(() => { note.previous() }).to.not.throw()
                    expect(note.name).to.equal("G");
                })

                it("Should not error when previous from A to G", () => {
                    note = new Note("A");
                    expect(() => { note.previous() }).to.not.throw()
                    expect(note.name).to.equal("G");
                })

                it("Should decrement the pitch when previous from C to B", () => {
                    note = new Note("C");
                    note.previous();
                    // default pitch is 4
                    expect(note.name).to.equal("B")
                    expect(note.pitch.value).to.equal(3)
                })
            })
        })
    })

    describe("Information", () => {
        describe("Semitones between two notes (note1, note2)", () => {
            describe("note2 > note1", () => {
                it("Should retrieve semitones between two notes of the same pitch", () => {
                    let note1 = new Note("C")
                    let note2 = new Note("D")
    
                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(2)
                })

                it("Should retrieve semitones between two notes of different pitch", () => {
                    let note1 = new Note("C")
                    let note2 = new Note("D", new Pitch(5))

                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(14)

                    note1 = new Note("C", new Pitch(0))
                    note2 = new Note("D", new Pitch(5))

                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(62)
                })

                it("Should count accidentals in it", () => {
                    let note1 = new Note("D",  new Pitch(4), new Accidental(-2));
                    let note2 = new Note("C", new Pitch(4));

                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(0)
                })
            })

            describe("note1 > note2", () => {
                it("Should retrieve semitones between two notes of the same pitch", () => {
                    let note1 = new Note("D")
                    let note2 = new Note("C")
    
                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(-2)
                })

                it("Should retrieve semitones between two notes of different pitch", () => {
                    let note1 = new Note("C")
                    let note2 = new Note("B", new Pitch(2))
    
                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(-13)

                    note1 = new Note("E")
                    note2 = new Note("B", new Pitch(2))
    
                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(-17)
                })
            })
        })
    })
})
