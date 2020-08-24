'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
li {
    list-style-type: none;
    width: 200px;
    margin: 5px;
}

a {
    color: blue;
    display: block;
    border: 1px solid blue;
    padding: 5px;
    text-decoration: none;
}
`;
describe('example: test: block elements', function() {

var output = barista({
content: styles,
});

it('should have a li + style', function() {
var rule = output.rule('li');

expect(rule.prop('list-style-type')).to.equal('none');
expect(rule.prop('width')).to.equal('200px');
expect(rule.prop('margin')).to.equal('5px');
});

it('should have a <a> element + style', function() {
var rule = output.rule('a');

expect(rule.prop('color')).to.equal('blue');
expect(rule.prop('display')).to.equal('block');
expect(rule.prop('border')).to.equal('1px solid blue');
expect(rule.prop('padding')).to.equal('5px');
expect(rule.prop('text-decoration')).to.equal('none');
});

});