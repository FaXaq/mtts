var expect = require('chai').expect;
var index = require('../dist/index.js');
var Rest = index.Rest;

describe('Rest Class', () => {
  describe('constructor', () => {
    it('Should instanciate a rest without parameter', () => {
      expect(() => new Rest()).to.not.throw();
    })
  })

  describe('Static', () => {
    describe('findLargest', () => {
      it('Should error when negative value is passed to it', () => {
        expect(() => Rest.findLargest(-3)).to.throw();
        expect(() => Rest.findLargest('test')).to.throw();
      })
    })
  })
})