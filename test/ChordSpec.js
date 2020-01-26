'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Chord = index.Chord;
var TRIADS = index.TRIADS;
var Note = index.Note;
var INTERVALS = index.INTERVALS;
var Interval = index.Interval;
var EXTENDED_CHORDS = index.EXTENDED_CHORDS;
var Scale = index.Scale;

describe("Chord class", () => {
    describe("Constructor", () => {
        it("Should instanciate a chord without parameter, and define default values for root and intervals", () => {
            let c;
            expect(() => c = new Chord()).to.not.throw()
        })

        it("Should be able to instanciate with only root", () => {
            expect(() => new Chord({
                root: new Note({
                    name: "A"
                })
            })).to.not.throw()
        })
    })

    describe("static", () => {
        it("Recursively compute chords & chords extension", () => {
            expect(Chord.extendedChordsIntervals).to.deep.include({
                ...EXTENDED_CHORDS["M7"],
                intervals: EXTENDED_CHORDS["M7"].extends.intervals
            })
        })
    })

    describe("Guess intervals", () => {
        it("Should guess intervals from chord notes", () => {
            let root = new Note({
                name: "F"
            });
            let c = new Chord({
                root,
                notes: [
                    root,
                    Interval.apply(root, "M3"),
                    new Note({
                        name: "C"
                    }),
                    Interval.apply(root, "M7")
                ]
            });
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
                expect(c.root).to.deep.equal(new Note({
                    name: "C"
                }))
            })

            it("Should be able to set root", () => {
                let c = new Chord()
                expect(() => c.root = new Note({
                    name: "A"
                })).to.not.throw()
            })

            it("Should check that the set root is a Note", () => {
                let c = new Chord()
                expect(() => c.root = "A").to.throw()
            })
        })

        describe("Intervals", () => {
            it("Should be able to get intervals", () => {
                let c = new Chord();
                expect(c.intervals).to.deep.equal(TRIADS.maj.intervals)
            })

            it("Should be able to set intervals", () => {
                let c = new Chord();
                expect(() => c.intervals = [...Object.keys(INTERVALS).map(k => k = new Interval(k))]).to.not.throw()
            })

            it("Should check that intervals are defined in INTERVALS", () => {
                let c = new Chord();
                expect(() => c.intervals = ["TEST"]).to.throw()
            })
        })

        describe("Notes", () => {
            it("Should be able to get notes", () => {
                let c = new Chord();
                expect(c.notes).to.deep.equals([
                    new Note({
                        name: "C"
                    }),
                    new Note({
                        name: "E"
                    }),
                    new Note({
                        name: "G"
                    })
                ])
            })
        })

        describe("Name", () => {
            describe("Triads", () => {

                it("Should give notation for major chord", () => {
                    let c = new Chord();
                    expect(c.notation).to.equal("")
                })
                it("Should give notation for minor chord", () => {
                    let c = new Chord({
                        root: new Note({
                            name: "C"
                        }),
                        intervals: [
                            new Interval("P1"),
                            new Interval("m3"),
                            new Interval("P5")
                        ]
                    });
                    expect(c.notation).to.equal("-")
                })
                it("Should give notation for diminished chord", () => {
                    let root = new Note({
                        name: "C"
                    });
                    let c = new Chord({
                        root,
                        notes: [
                            root,
                            Interval.apply(root, "m3"),
                            Interval.apply(root, "d5")
                        ]
                    });
                    expect(c.notation).to.equal("°")
                })
                it("Should give notation for augmented chord", () => {
                    let root = new Note({
                        name: "C"
                    });
                    let c = new Chord({
                        root,
                        notes: [
                            root,
                            Interval.apply(root, "M3"),
                            Interval.apply(root, "A5")
                        ]
                    });
                    expect(c.notation).to.equal("+")
                })
                it("Should give notation for suspended 2 chord", () => {
                    let root = new Note({
                        name: "C"
                    });
                    let c = new Chord({
                        root,
                        notes: [
                            root,
                            Interval.apply(root, "M2"),
                            Interval.apply(root, "P5")
                        ]
                    });
                    expect(c.notation).to.equal("sus2")
                })
                it("Should give notation for suspended 2 chord", () => {
                    let root = new Note({
                        name: "C"
                    });
                    let c = new Chord({
                        root,
                        notes: [
                            root,
                            Interval.apply(root, "P4"),
                            Interval.apply(root, "P5")
                        ]
                    });
                    expect(c.notation).to.equal("sus4")
                })
            })

            describe("Extended", () => {
                it("Should give notation for Major 7 chord", () => {
                    let root = new Note({
                        name: "C"
                    });
                    let c = new Chord({
                        root,
                        notes: [
                            root,
                            Interval.apply(root, "M3"),
                            Interval.apply(root, "P5"),
                            Interval.apply(root, "M7")
                        ]
                    });
                    expect(c.notation).to.equal("M7")
                })

                it("Should give notation for minor 7 chord", () => {
                    let root = new Note({
                        name: "C"
                    });
                    let c = new Chord({
                        root,
                        notes: [
                            root,
                            Interval.apply(root, "m3"),
                            Interval.apply(root, "P5"),
                            Interval.apply(root, "m7")
                        ]
                    });
                    expect(c.notation).to.equal("-7")
                })

                it("Should give notation for minor 7 flat 5 chord", () => {
                    let root = new Note({
                        name: "C"
                    });
                    let c = new Chord({
                        root,
                        notes: [
                            root,
                            Interval.apply(root, "m3"),
                            Interval.apply(root, "d5"),
                            Interval.apply(root, "m7")
                        ]
                    });
                    expect(c.notation).to.equal("-7/5b")
                })
            })
        })
    })
})