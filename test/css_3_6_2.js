'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
.main{
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .first{
    width: 250px;
    height: 350px;
    border: 1px solid black;
    padding: 20px;
    margin: 10px;
  }

  .second{
    width: 250px;
    height: 350px;
    border: 1px solid black;
    padding: 20px;
    margin: 10px;
    order: 4;
  }
  .price{
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    justify-content: space-between;
  }

`;
describe('example: test: flex', function() {

var output = barista({
content: styles,
});

it('should have a main div element + style', function() {
var rule = output.rule('.main');

expect(rule.prop('display')).to.equal('inline-flex');
expect(rule.prop('flex-direction')).to.equal('row');
expect(rule.prop('flex-wrap')).to.equal('wrap');

});

it('should have a first div element + style', function() {
var rule = output.rule('.first');

expect(rule.prop('width')).to.equal('250px');
expect(rule.prop('height')).to.equal('350px');
expect(rule.prop('border')).to.equal('1px solid black');
expect(rule.prop('padding')).to.equal('20px');
expect(rule.prop('margin')).to.equal('10px');
});

it('should have a second div element + style', function() {
var rule = output.rule('.second');

expect(rule.prop('width')).to.equal('250px');
expect(rule.prop('height')).to.equal('350px');
expect(rule.prop('border')).to.equal('1px solid black');
expect(rule.prop('padding')).to.equal('20px');
expect(rule.prop('margin')).to.equal('10px');
expect(rule.prop('order')).to.equal('4');
});

it('should have a price div element + style', function() {
var rule = output.rule('.price');

expect(rule.prop('display')).to.equal('flex');
expect(rule.prop('flex-direction')).to.equal('row');
expect(rule.prop('flex-flow')).to.equal('row wrap');
expect(rule.prop('justify-content')).to.equal('space-between');
});

});