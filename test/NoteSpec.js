'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Note = index.Note;

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
            let note = new Note("A", 0);
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
})
