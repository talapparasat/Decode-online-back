'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
h1{
    text-align: center;
}
h2{
    text-align: center;
}
p{
    text-align: justify;
}
`;

describe('example: test: text-align', function() {

var output = barista({
content: styles,
});

it('should have a h1 heading + style', function() {
var rule = output.rule('h1');

expect(rule.prop('text-align')).to.equal('center');
});

it('should have a h2 heading + style', function() {
var rule = output.rule('h2');

expect(rule.prop('text-align')).to.equal('center');
});

it('shoul have a p element +style', function() {
var rule = output.rule('p');

expect(rule.prop('text-align')).to.equal('justify');
});
});