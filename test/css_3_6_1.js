'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
nav {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  @media only screen and (min-width: 768px) {
    nav { flex-direction: row; }
  }

  nav a{
    flex: 1;
    text-align: center;
    margin: 0.25em;
    padding: 0.25em;
    border: 1px solid blue;
    text-decoration: none;
    color: #555;
  }

`;
describe('example: test: flex', function() {

var output = barista({
content: styles,
});

it('should have a nav element + style', function() {
var rule = output.rule('nav');

expect(rule.prop('display')).to.equal('flex');
expect(rule.prop('justify-content')).to.equal('space-between');
expect(rule.prop('flex-direction')).to.equal('column');

});

it('should have a nav a element + style', function() {
var rule = output.rule('nav a');

expect(rule.prop('flex')).to.equal('1');
expect(rule.prop('text-align')).to.equal('center');
expect(rule.prop('margin')).to.equal('0.25em');
expect(rule.prop('padding')).to.equal('0.25em');
expect(rule.prop('border')).to.equal('1px solid blue');
expect(rule.prop('text-decoration')).to.equal('none');
expect(rule.prop('color')).to.equal('#555');
});


});
