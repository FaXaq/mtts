'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Interval = index.Interval;
var Note = index.Note;

describe("Interval class", () => {
    describe("Constructor", () => {
        it("Should always work as interval in not an instanciable class", () => {
            expect(() => { new Interval() }).to.not.throw()
        })
    })

    describe("Get new note from interval name and initial note", () => {
        it("Should work with the perfect unison", () => {
            let note1 = new Note("C")

            expect(Interval.getNote(note1, "P1")).to.deep.equal(new Note("C"))
        })
    })
})