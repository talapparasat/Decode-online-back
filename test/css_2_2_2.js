'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
div#text{
    color:lightpink;
    text-align:center;
    width:400px;
    border:2px solid lightcoral;
}
p#text{
    width:400px;
}`;

describe('example: test: group selectors', function() {

var output = barista({
content: styles,
});

it('should have a div container with id text + style', function() {
var rule = output.rule('div#text');

expect(rule.prop('color')).to.equal('lightpink');
expect(rule.prop('text-align')).to.equal('center');
expect(rule.prop('width')).to.equal('400px');
expect(rule.prop('border')).to.equal('2px solid lightcoral');
});

it('should have a p element with id= ‘text’ + style', function() {
var rule = output.rule('p#text');

expect(rule.prop('width')).to.equal('400px');
});
});