'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
.first{
    background:#FC3;
    padding:10px;
    border: 4px double black;
}

.second{
   background: grey;
    border-top: 4px solid red;
    border-bottom: 4px solid red;
    padding-top: 10px;
    padding-bottom: 10px;
}

.third{
    background: red;
    border-left: 4px dashed white;
    border-right: 4px dotted white;
    padding-left: 10px;
    padding-right: 5px;

}
`;

describe('example: test: margin, padding, border', function() {

var output = barista({
content: styles,
});

it('should have a first div element + style', function() {
var rule = output.rule('.first');

expect(rule.prop('border')).to.equal('4px double black');
expect(rule.prop('background')).to.equal('#FC3');
expect(rule.prop('padding')).to.equal('10px');
});

it('should have a second div element + style', function() {
var rule = output.rule('.second');

expect(rule.prop('border-top')).to.equal('4px solid red');
expect(rule.prop('border-bottom')).to.equal('4px solid red');
expect(rule.prop('background')).to.equal('grey');
expect(rule.prop('padding-top')).to.equal('10px');
expect(rule.prop('padding-bottom')).to.equal('10px');
});

it('should have a third div element + style', function() {
var rule = output.rule('.third');

expect(rule.prop('background')).to.equal('red');
expect(rule.prop('border-left')).to.equal('4px dashed white');
expect(rule.prop('border-right')).to.equal('4px dotted white');
expect(rule.prop('padding-left')).to.equal('10px');
expect(rule.prop('padding-right')).to.equal('5px');
});

});