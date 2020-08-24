'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
div{
border:2px solid violet;
}
span{
color: blue;
}`;

describe('example: test: font-weight, font-style', function() {

var output = barista({
content: styles,
});

it('should have a div container + style', function() {
var rule = output.rule('div');

expect(rule.prop('border')).to.equal('2px solid violet');
});

it('should have a span element + style', function() {
var rule = output.rule('span');

expect(rule.prop('color')).to.equal('blue');
});
});