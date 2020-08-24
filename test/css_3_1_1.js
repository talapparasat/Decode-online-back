'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
li {    
    list-style-type: none; 
}
a {
    color: blue;
}
a:link, a:visited {
    text-decoration: none;
    color: blue;
}
a:hover {
    font-weight: bold;
}

a:active{
    color: red;
}
`;
describe('example: test: pseudo elements', function() {

var output = barista({
content: styles,
});

it('should have an li + style', function() {
var rule = output.rule('li');

expect(rule.prop('list-style-type')).to.equal('none');
});

it('should have an a + style', function() {
var rule = output.rule('a');

expect(rule.prop('color')).to.equal('blue');
});

it('should have an link state + style', function() {
var rule = output.rule('a:link');

expect(rule.prop('text-decoration')).to.equal('none');
expect(rule.prop('color')).to.equal('blue');
});

it('should have a visited state + style', function() {
    var rule = output.rule('a:visited');
    
    expect(rule.prop('text-decoration')).to.equal('none');
    expect(rule.prop('color')).to.equal('blue');
    });

it('should have a hover state + style', function() {
var rule = output.rule('a:hover');

expect(rule.prop('font-weight')).to.equal('bold');
});

it('should have a active state + style', function() {
var rule = output.rule('a:active');

expect(rule.prop('color')).to.equal('red');
});
});