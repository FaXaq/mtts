'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Note = index.Note;
var Pitch = index.Pitch;
var Accidental = index.Accidental;
var ACCIDENTAL = index.ACCIDENTAL;

describe("Note class", () => {
    describe("Constructor", () => {
        it("Should check if the name is valid before creating a note", () => {
            expect(() => { new Note({ name: "H" }) }).to.throw();
        })
    
        it("Should create a note if the name is valid", () => {
            expect(() => new Note({ name: "A" })).to.not.throw();
        });
    
        it("Should create a note with a default pitch of 4", () => {
            let note = new Note({ name: "A" });
            expect(note.pitch.value).to.equal(4);
        })
    
        it("Should accept a pitch as a second arg", () => {
            let note = new Note({ 
                name: "A", 
                pitch: new Pitch({
                    value: 0
                }) 
            });

            expect(note.pitch.value).to.equal(0);
        })
    })

    describe("Modifiers", () => {
        var note;

        beforeEach(() => {
            note = new Note({ 
                name: "A" 
            });
        })

        describe("Previous & Next", () => {
            describe("Next", () => {
                it("Should be able to change the note to the next one", () => {
                    note.next();
                    expect(note.name).to.equal("B");
                })

                it("Should increment the pitch when next from B to C", () => {
                    note = new Note({ 
                        name: "B" 
                    });
                    note.next();
                    // default pitch is 4
                    expect(note.name).to.equal("C")
                    expect(note.pitch.value).to.equal(5)
                })
            })

            describe("Should be able to change the note to the previous one", () => {
                it("Should not error when previous from A to G", () => {
                    note = new Note({ 
                        name: "A"
                    });

                    expect(() => { note.previous() }).to.not.throw()

                    expect(note.name).to.equal("G");
                })

                it("Should decrement the pitch when previous from C to B", () => {
                    note = new Note({ 
                        name: "C" 
                    });
                    note.previous();
                    // default pitch is 4
                    expect(note.name).to.equal("B")
                    expect(note.pitch.value).to.equal(3)
                })
            })
        })

        describe("Add an accidental", () => {
            describe("Add sharp", () => {
                it("Should add sharp to a note without accidental", () => {
                    let note = new Note({
                        name: "A"
                    })

                    note.addSharp()

                    expect(note.accidental).to.deep.equal(new Accidental({ semitones: ACCIDENTAL.SHARP }))
                })

                it("Should add sharp to a note with already an accidental", () => {
                    let note = new Note({
                        name: "A",
                        accidental: new Accidental({
                            semitones: ACCIDENTAL.FLAT
                        })
                    })

                    note.addSharp()

                    expect(note.accidental).to.deep.equal(new Accidental({ semitones: ACCIDENTAL.NATURAL }))
                })
            })


            describe("Add flat", () => {
                it("Should add flat to a note without accidental", () => {
                    let note = new Note({
                        name: "A"
                    })

                    note.addFlat()

                    expect(note.accidental).to.deep.equal(new Accidental({ semitones: ACCIDENTAL.FLAT }))
                })

                it("Should add flat to a note with already an accidental", () => {
                    let note = new Note({
                        name: "A",
                        accidental: new Accidental({
                            semitones: ACCIDENTAL.SHARP
                        })
                    })

                    note.addFlat()

                    expect(note.accidental).to.deep.equal(new Accidental({ semitones: ACCIDENTAL.NATURAL }))
                })
            })
        })
    })

    describe("Information", () => {
        describe("Semitones between two notes (note1, note2)", () => {
            describe("note2 > note1", () => {
                it("Should retrieve semitones between two notes of the same pitch", () => {
                    const note1 = new Note({ 
                        name: "C"
                    })
                    const note2 = new Note({ 
                        name: "D" 
                    })
    
                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(2)
                })

                it("Should retrieve semitones between two notes of different pitch", () => {
                    let note1 = new Note({ 
                        name: "C" 
                    })
                    let note2 = new Note({
                        name: "D", 
                        pitch: new Pitch({
                            value: 5
                        }) 
                    })

                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(14)

                    note1 = new Note({
                        name: "C",
                        pitch: new Pitch({
                            value: 0
                        }) 
                    })

                    note2 = new Note({ 
                        name: "D",
                        pitch: new Pitch({
                            value: 5
                        })
                    })

                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(62)
                })

                it("Should count accidentals in it", () => {
                    const note1 = new Note({
                        name: "D", 
                        pitch: new Pitch({
                            value: 4
                        }),
                        accidental: new Accidental({
                            semitones: -2
                        })
                    });

                    const note2 = new Note({ 
                        name: "C", 
                        pitch: new Pitch({
                            value: 4
                        })
                    });

                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(0)
                })
            })

            describe("note1 > note2", () => {
                it("Should retrieve semitones between two notes of the same pitch", () => {
                    const note1 = new Note({
                        name: "D"
                    })
                    const note2 = new Note({
                        name: "C"
                    })
    
                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(-2)
                })

                it("Should retrieve semitones between two notes of different pitch", () => {
                    let note1 = new Note({
                        name: "C"
                    })
                    let note2 = new Note({
                        name: "B",
                        pitch: new Pitch({
                            value: 2
                        })
                    })
    
                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(-13)

                    note1 = new Note({
                        name: "E"
                    })
                    note2 = new Note({
                        name: "B",
                        pitch: new Pitch({
                            value: 2
                        })
                    })

                    expect(Note.getSemitonesBetween(note1, note2)).to.equal(-17)
                })
            })
        })
    })

    describe('Note index difference', () => {
        it("Should get index difference between two notes", () => {
            let note1 = new Note({
                name: "D"
            })
            let note2 = new Note({
                name: "E"
            })
            expect(Note.getIndexDifferenceBetween(note1, note2)).to.equal(2)
            note2 = new Note({
                name: "B"
            })
            expect(Note.getIndexDifferenceBetween(note1, note2)).to.equal(6)
            note2 = new Note({
                name: "C"
            })
            expect(Note.getIndexDifferenceBetween(note1, note2)).to.equal(7)
        })
    })
})
