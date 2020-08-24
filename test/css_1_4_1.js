'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
h1{
    font-weight: normal;
}
p{
    font-style: italic;
}
`;

describe('example: test: font-weight, font-style', function() {

var output = barista({
content: styles,
});

it('should have a h1 heading + style', function() {
var rule = output.rule('h1');
expect(rule.exists()).to.be.true;
expect(rule.prop('font-weight')).to.equal('normal');
});

it('should have a p element + style', function() {
var rule = output.rule('p');
expect(rule.exists()).to.be.true;
expect(rule.prop('font-style')).to.equal('italic');
});
});