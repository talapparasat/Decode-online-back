'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
.main{
    border: 2px solid blue;
    padding: 20px;
  }

.first{
    background:#FC3;
    border: 10px double black;
    padding:10px;
    margin-right: 20px;
    float: left;
}
  p{
    width: 620px;
    margin-left: 100px;
  }
`;
describe('example: test: margin, padding, border', function() {

var output = barista({
content: styles,
});

it('should have a main div element + style', function() {
var rule = output.rule('.main');

expect(rule.prop('border')).to.equal('2px solid blue');
expect(rule.prop('padding')).to.equal('20px');
});

it('should have a first div element + style', function() {
var rule = output.rule('.first');

expect(rule.prop('border')).to.equal('10px double black');
expect(rule.prop('background')).to.equal('#FC3');
expect(rule.prop('padding')).to.equal('10px');
expect(rule.prop('float')).to.equal('left');
expect(rule.prop('margin-right')).to.equal('20px');
});

it('should have a p element + style', function() {
var rule = output.rule('p');

expect(rule.prop('width')).to.equal('620px');
expect(rule.prop('margin-left')).to.equal('100px');
});

});