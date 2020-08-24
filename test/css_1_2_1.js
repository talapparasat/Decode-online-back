'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
h1{color:red;
}
h2{
    color: blue;
}
h3{
    color:#054805;
}

`;

describe('example: test: color h1,h2,h3', function() {

var output = barista({
content: styles,
});

it('should have a h1 heading + style', function() {
var rule = output.rule('h1');

expect(rule.prop('color')).to.equal('red');
});

it('should have a h2 heading + style', function() {
var rule = output.rule('h2');

expect(rule.prop('color')).to.equal('blue');
});

it('should have a h3 heading + style', function() {
var rule = output.rule('h3');

expect(rule.prop('color')).to.equal('#054805');
});
});
