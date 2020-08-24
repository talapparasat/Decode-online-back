'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
body{
    width: 100%;
    margin: 0;
    background-color: #C9D6FF;
    background: linear-gradient(to right, #E2E2E2, #C9D6FF);
  }

  .nav-items {
    list-style: none;
    margin: 0;  
    background: linear-gradient(to right, #fdeff9, #ec38bc, #7303c0, #03001e); 
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
  }

  .nav-items a {
    text-decoration: none;
    display: block;
    padding: 1em;
    color: white;
    font-size: 20px;
  }

  .nav-items a:hover{
    text-decoration: underline;
  }

  .button{
    color:white;
    padding:15px 10px;
    text-align:center;
    margin:4px 2px;
    background: radial-gradient(white, #FFA9A1); 
    font-size: 20px;
  }
`;
describe('example: test: flex', function() {

var output = barista({
content: styles,
});

it('should have a body element + style', function() {
var rule = output.rule('body');

expect(rule.prop('width')).to.equal('100%');
expect(rule.prop('margin')).to.equal('0');
expect(rule.prop('background-color')).to.equal('#C9D6FF');
expect(rule.prop('background')).to.equal('linear-gradient(to right, #E2E2E2, #C9D6FF)');
});


it('should have a .nav-items element + style', function() {
var rule = output.rule('.nav-items');

expect(rule.prop('list-style')).to.equal('none');
expect(rule.prop('margin')).to.equal('0');
expect(rule.prop('background')).to.equal('linear-gradient(to right, #fdeff9, #ec38bc, #7303c0, #03001e)');
expect(rule.prop('display')).to.equal('flex');
expect(rule.prop('flex-flow')).to.equal('row wrap');
expect(rule.prop('justify-content')).to.equal('flex-end');
});

it('should have a .nav-items a element + style', function() {
var rule = output.rule('.nav-items a');

expect(rule.prop('text-decoration')).to.equal('none');
expect(rule.prop('display')).to.equal('block');
expect(rule.prop('padding')).to.equal('1em');
expect(rule.prop('color')).to.equal('white');
expect(rule.prop('font-size')).to.equal('20px');
});


it('should have a .nav-items a:hover element + style', function() {
var rule = output.rule('.nav-items a:hover');

expect(rule.prop('text-decoration')).to.equal('underline');

});

it('should have a .button element + style', function() {
var rule = output.rule('.button');

expect(rule.prop('padding')).to.equal('15px 10px');
expect(rule.prop('color')).to.equal('white');
expect(rule.prop('text-align')).to.equal('center');
expect(rule.prop('margin')).to.equal('4px 2px');
expect(rule.prop('background')).to.equal('radial-gradient(white, #FFA9A1)');
expect(rule.prop('font-size')).to.equal('20px');
});

});