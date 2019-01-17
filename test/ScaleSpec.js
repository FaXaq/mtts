'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var Scale = index.Scale;

describe("Scale class", () => {
    describe("Constructor", () => {
        it("Should create a major scale without name provided", () => {
            let s = new Scale()
            expect(s.name).to.equal("major")
        })
    })
})