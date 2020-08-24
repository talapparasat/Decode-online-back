'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
p::first-letter{
    color: green;
    font-weight: bold;
}
p::before{
    content: "Язык ";
}
p::first-line{
    color:blue;
}
`;

describe('example: test: pseudo elements', function() {

var output = barista({
content: styles,
});

it('should have a p::first-letter + style', function() {
var rule = output.rule('p::first-letter');

expect(rule.prop('color')).to.equal('green');
expect(rule.prop('font-weight')).to.equal('bold');
});

it('should have a p::first-line + style', function() {
var rule = output.rule('p::first-line');

expect(rule.prop('color')).to.equal('blue');
});

});