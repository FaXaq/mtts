'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Scale = index.Scale;
var Note = index.Note;

describe("Scale class", () => {
    describe("Constructor", () => {
        it("Should create a major scale without name provided", () => {
            let s = new Scale()
            expect(s.name).to.equal("major")
            expect(s.key).to.deep.equal(new Note({
                name: "C"
            }))
            expect(s.notes).to.deep.equal({
                1: new Note({ name: "C" }),
                2: new Note({ name: "D" }),
                3: new Note({ name: "E" }),
                4: new Note({ name: "F" }),
                5: new Note({ name: "G" }),
                6: new Note({ name: "A" }),
                7: new Note({ name: "B" }),
            })
        })

        it("Should reject any name unknown", () => {
            expect(() => { 
                new Scale({
                    name: "wat"
                })
            }).to.throw()
        })
    })
})