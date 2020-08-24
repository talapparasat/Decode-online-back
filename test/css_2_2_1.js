'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
h1,h2{
    text-align:center;
    color:darkcyan;
}
.text{
    font-style:italic;
}`;

describe('example: test: group selectors', function() {

var output = barista({
content: styles,
});

it('should have a h1 heading + style', function() {
var rule = output.rule('h1');

expect(rule.prop('text-align')).to.equal('center');
});

it('should have a h1 heading + style', function() {
    var rule = output.rule('h1');
    
    expect(rule.prop('color')).to.equal('darkcyan');
    });

it('should have a h2 heading + style', function() {
var rule = output.rule('h2');

expect(rule.prop('text-align')).to.equal('center');
});

it('should have a h2 heading + style', function() {
    var rule = output.rule('h2');
    
    expect(rule.prop('color')).to.equal('darkcyan');
    });

it('should have a .text + style', function() {
var rule = output.rule('.text');

expect(rule.prop('font-style')).to.equal('italic');
});
});