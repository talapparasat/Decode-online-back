'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = "";

describe('example: test: text-align', function() {

var output = barista({
content: styles,
});

it('should have a h1 + style', function() {
var rule = output.rule('h1');

expect(rule.prop('text-align')).to.equal('center');
});

it('should have a h2 + style', function() {
var rule = output.rule('h2');

expect(rule.prop('text-align')).to.equal('center');
});

it('should have a p + style', function() {
var rule = output.rule('p');

expect(rule.prop('text-align')).to.equal('justify');
});
});