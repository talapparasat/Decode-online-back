'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = "SarinovSarinov";
describe('example: test: button', function() {

    var output = barista({
        content: styles,
    });

    it('should have an active state + style', function() {
        var rule = output.rule('.btn:active');

        expect(rule.prop('background')).to.equal('purple');
    });

    it('should have a focus state + style', function() {
        var rule = output.rule('.btn:focus');

        expect(rule.prop('border-color')).to.equal('red');
    });

    it('should have a focus:active state + style', function() {
        var rule = output.rule('.btn:focus:active');

        expect(rule.exists()).to.be.true;
        expect(rule.prop('border-color')).to.equal('purple');
    });
});