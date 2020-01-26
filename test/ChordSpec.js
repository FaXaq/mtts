'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Chord = index.Chord;
var TRIADS = index.TRIADS;
var Note = index.Note;
var INTERVALS = index.INTERVALS;
var Interval = index.Interval;

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
            console.log(c);
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

                it("Should give name for major chord", () => {
                    let c = new Chord();
                    expect(c.name).to.equal("C")
                })
                it("Should give name for minor chord", () => {
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
                    expect(c.name).to.equal("C-")
                })
                it("Should give name for diminished chord", () => {
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
                    expect(c.name).to.equal("C°")
                })
                it("Should give name for augmented chord", () => {
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
                    expect(c.name).to.equal("C+")
                })
                it("Should give name for suspended 2 chord", () => {
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
                    expect(c.name).to.equal("Csus2")
                })
                it("Should give name for suspended 2 chord", () => {
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
                    expect(c.name).to.equal("Csus4")
                })
            })

            describe("Extended", () => {
                it("Should give name for Major 7 chord", () => {
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
                    expect(c.name).to.equal("C7")
                })
            })
        })
    })
})