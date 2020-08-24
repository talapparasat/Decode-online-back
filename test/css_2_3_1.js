'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
#underline{
    text-decoration:underline;
}
#overline{
    text-decoration: overline;
}
#line-through{
    text-decoration: line-through;
}

#blink{
    text-decoration: blink;
}
#red-underline-overline-wavy{
    text-decoration: red underline overline wavy;
}
`;

describe('example: test: text-decoration', function() {

var output = barista({
content: styles,
});

it('should have a p with id underline + style', function() {
var rule = output.rule('#underline');

expect(rule.prop('text-decoration')).to.equal('underline');

});

it('should have a p with id overline + style', function() {
var rule = output.rule('#overline');

expect(rule.prop('text-decoration')).to.equal('overline');
});

it('should have a p with id line-through + style', function() {
var rule = output.rule('#line-through');

expect(rule.prop('text-decoration')).to.equal('line-through');
});


it('should have a p with id blink + style', function() {
var rule = output.rule('#blink');

expect(rule.prop('text-decoration')).to.equal('blink');
});

});