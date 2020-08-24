'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
.article{
    background: green;
    padding: 5px;
    width: 500px;
    margin-left: 25px;
    position: fixed;
}

h1{
    color: #ffffff;
    font-size: 30px;
}

.content-1{
    background: peachpuff;
    margin-top: 20px;
    margin: 10px;
    width: 500px;
    padding: 20px;
    position:static;
}
.content-2{
    background: peachpuff;
    margin-top: 20px;
    margin: 10px;
    width: 500px;
    padding: 20px;
    position:static;
}
.content-3{
    background: peachpuff;
    margin-top: 20px;
    margin: 10px;
    width: 500px;
    padding: 20px;
    position:static;
}

.content-4{
    background: peachpuff;
    margin-top: 20px;
    margin: 10px;
    width: 500px;
    padding: 20px;
    position:static;
}

.content-5{
    background: peachpuff;
    margin-top: 20px;
    margin: 10px;
    width: 500px;
    padding: 20px;
    position:static;
}

.content-6{
    background: peachpuff;
    margin-top: 20px;
    margin: 10px;
    width: 500px;
    padding: 20px;
    position:static;
}
.text{
    margin-top: 100px;
}
.article-1{
    background: green;
    padding: 5px;
    width: 500px;
    margin-left: 20px;
    position: absolute;
}
`;
describe('example: test: position', function() {

var output = barista({
content: styles,
});

it('should have a .article div element + style', function() {
var rule = output.rule('.article');

expect(rule.prop('background')).to.equal('green');
expect(rule.prop('padding')).to.equal('5px');
expect(rule.prop('width')).to.equal('500px');
expect(rule.prop('margin-left')).to.equal('25px');
expect(rule.prop('position')).to.equal('fixed');
});

it('should have a h1 element + style', function() {
var rule = output.rule('h1');

expect(rule.prop('color')).to.equal('#ffffff');
expect(rule.prop('font-size')).to.equal('30px');
});

it('should have a content1 elements + style', function() {
var rule = output.rule('.content-1');

expect(rule.prop('margin-top')).to.equal('20px');
expect(rule.prop('background')).to.equal('peachpuff');
expect(rule.prop('width')).to.equal('500px');
expect(rule.prop('padding')).to.equal('20px');
expect(rule.prop('margin')).to.equal('10px');
expect(rule.prop('position')).to.equal('static');
});

it('should have a content2 elements + style', function() {
    var rule = output.rule('.content-2');
    
    expect(rule.prop('margin-top')).to.equal('20px');
    expect(rule.prop('background')).to.equal('peachpuff');
    expect(rule.prop('width')).to.equal('500px');
    expect(rule.prop('padding')).to.equal('20px');
    expect(rule.prop('margin')).to.equal('10px');
    expect(rule.prop('position')).to.equal('static');
});

it('should have a content3 elements + style', function() {
    var rule = output.rule('.content-3');
    
    expect(rule.prop('margin-top')).to.equal('20px');
    expect(rule.prop('background')).to.equal('peachpuff');
    expect(rule.prop('width')).to.equal('500px');
    expect(rule.prop('padding')).to.equal('20px');
    expect(rule.prop('margin')).to.equal('10px');
    expect(rule.prop('position')).to.equal('static');
});

it('should have a content4 elements + style', function() {
    var rule = output.rule('.content-4');
    
    expect(rule.prop('margin-top')).to.equal('20px');
    expect(rule.prop('background')).to.equal('peachpuff');
    expect(rule.prop('width')).to.equal('500px');
    expect(rule.prop('padding')).to.equal('20px');
    expect(rule.prop('margin')).to.equal('10px');
    expect(rule.prop('position')).to.equal('static');
});

it('should have a content5 elements + style', function() {
    var rule = output.rule('.content-5');
    
    expect(rule.prop('margin-top')).to.equal('20px');
    expect(rule.prop('background')).to.equal('peachpuff');
    expect(rule.prop('width')).to.equal('500px');
    expect(rule.prop('padding')).to.equal('20px');
    expect(rule.prop('margin')).to.equal('10px');
    expect(rule.prop('position')).to.equal('static');
});

it('should have a content6 elements + style', function() {
    var rule = output.rule('.content-6');
    
    expect(rule.prop('margin-top')).to.equal('20px');
    expect(rule.prop('background')).to.equal('peachpuff');
    expect(rule.prop('width')).to.equal('500px');
    expect(rule.prop('padding')).to.equal('20px');
    expect(rule.prop('margin')).to.equal('10px');
    expect(rule.prop('position')).to.equal('static');
});
   
it('should have a .text element + style', function() {
var rule = output.rule('.text');

expect(rule.prop('margin-top')).to.equal('100px');
});

it('should have a .article-1 element + style', function() {
var rule = output.rule('.article-1');

expect(rule.prop('background')).to.equal('green');
expect(rule.prop('padding')).to.equal('5px');
expect(rule.prop('width')).to.equal('500px');
expect(rule.prop('margin-left')).to.equal('20px');
expect(rule.prop('position')).to.equal('absolute');
});
});