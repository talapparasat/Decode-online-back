'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
.main{
    display: inline;
  }

  .first{
    border: 2px solid black;
    padding: 20px;
    margin: 20px;
    display: inline-block;
  }

  .price{
    color: green;
  }
`;
describe('example: test: display', function() {

var output = barista({
content: styles,
});

it('should have a main div element + style', function() {
var rule = output.rule('.main');

expect(rule.prop('display')).to.equal('inline');

});

it('should have a first div element + style', function() {
var rule = output.rule('.first');

expect(rule.prop('border')).to.equal('2px solid black');
expect(rule.prop('padding')).to.equal('20px');
expect(rule.prop('margin')).to.equal('20px');
expect(rule.prop('display')).to.equal('inline-block');
});


it('should have a p element + style', function() {
var rule = output.rule('.price');

expect(rule.prop('color')).to.equal('green');
});

});
