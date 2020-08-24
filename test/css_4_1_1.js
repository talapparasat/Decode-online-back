'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
body  {
    background-image: url("https://ringvemedia.com/server//bg.jpg");
    height: 100vh;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .description{
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;
  }

  .text{
    text-align: center;
    font-size: 60px;
  }

  .footer{
    background-color: #111111;
    opacity: 0.5;
    width: 100%;
    height: 50px;
    margin-top: 200px;
  }
`;
describe('example: test: flex', function() {

var output = barista({
content: styles,
});


it('should have a body element + style', function() {
var rule = output.rule('body');

expect(rule.prop('background-image')).to.equal('url("https://ringvemedia.com/server//bg.jpg")');
expect(rule.prop('height')).to.equal('100vh');
expect(rule.prop('background-position')).to.equal('center');
expect(rule.prop('background-size')).to.equal('cover');
expect(rule.prop('background-repeat')).to.equal('no-repeat');

});


it('should have a .description div element + style', function() {
var rule = output.rule('.description');

expect(rule.prop('width')).to.equal('40%');
expect(rule.prop('margin-left')).to.equal('auto');
expect(rule.prop('margin-right')).to.equal('auto');
expect(rule.prop('font-size')).to.equal('20px');
});

it('should have a .text element + style', function() {
var rule = output.rule('.text');

expect(rule.prop('text-align')).to.equal('center');
expect(rule.prop('font-size')).to.equal('60px');
});

it('should have a .footer element + style', function() {
var rule = output.rule('.footer');

expect(rule.prop('background-color')).to.equal('#111111');
expect(rule.prop('opacity')).to.equal('0.5');
expect(rule.prop('width')).to.equal('100%');
expect(rule.prop('height')).to.equal('50px');
expect(rule.prop('margin-top')).to.equal('200px');
});


});