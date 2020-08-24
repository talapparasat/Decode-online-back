'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
ul {
    background-color: #333333;
    overflow: hidden;
      list-style-type: none;
      margin: 0;											padding: 0;
}

            li {
                  float: left;
            }

            li a {
                color: white;
                text-align: center;
                padding: 16px;
                  display: block;
                  text-decoration: none;
                
            }

            li a:hover {
                  background-color: #111111;
            }

`;
describe('example: test: display', function() {

var output = barista({
content: styles,
});


it('should have a ul element + style', function() {
var rule = output.rule('ul');

expect(rule.prop('list-style-type')).to.equal('none');
expect(rule.prop('margin')).to.equal('0');
expect(rule.prop('padding')).to.equal('0');
expect(rule.prop('overflow')).to.equal('hidden');
expect(rule.prop('background-color')).to.equal('#333333');
});

it('should have a li element + style', function() {
var rule = output.rule('li');

expect(rule.prop('float')).to.equal('left');
});

it('should have a li a element + style', function() {
var rule = output.rule('li a');

expect(rule.prop('display')).to.equal('block');
expect(rule.prop('color')).to.equal('white');
expect(rule.prop('text-align')).to.equal('center');
expect(rule.prop('padding')).to.equal('16px');
expect(rule.prop('text-decoration')).to.equal('none');
});

it('should have hover state + style', function() {
var rule = output.rule('li a:hover');

expect(rule.prop('background-color')).to.equal('#111111');
});

});