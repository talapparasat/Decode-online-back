'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = `
body {
    margin: 0;
    }
    #main {
      display: flex;
      min-height: 60vh;
    } 
    article {
      flex: 1;
      padding: 1em;
    }
    nav{
      flex: 0 0 20vw;
      background: beige;
      order: -1;
      padding: 1em;
    }
    aside {
      flex: 0 0 20vw;
      background: beige;
      padding: 1em;
    }
    
    header {
      background: yellowgreen;
      height: 15vh;
      padding: 1em;
    }
    footer {
      background: yellowgreen;
      height: 15vh;
      padding: 1em;
    }
`;
describe('example: test: flex', function() {

var output = barista({
content: styles,
});


it('should have a body element + style', function() {
var rule = output.rule('body');

expect(rule.prop('margin')).to.equal('0');

});

it('should have a main div element + style', function() {
var rule = output.rule('#main');

expect(rule.prop('display')).to.equal('flex');
expect(rule.prop('min-height')).to.equal('60vh');
});

it('should have a article element + style', function() {
var rule = output.rule('article');

expect(rule.prop('flex')).to.equal('1');
});

it('should have a aside element + style', function() {
var rule = output.rule('aside');

expect(rule.prop('flex')).to.equal('0 0 20vw');
expect(rule.prop('background')).to.equal('beige');
});

it('should have a  nav element + style', function() {
var rule = output.rule('nav');
expect(rule.prop('flex')).to.equal('0 0 20vw');
expect(rule.prop('background')).to.equal('beige');
expect(rule.prop('order')).to.equal('-1');

});

it('should have a header', function() {
var rule = output.rule('header');

expect(rule.prop('padding')).to.equal('1em');
});

it('should have a  footer', function() {
  var rule = output.rule('footer');
  
  expect(rule.prop('padding')).to.equal('1em');
  });

  it('should have a  article', function() {
    var rule = output.rule('article');
    
    expect(rule.prop('padding')).to.equal('1em');
    });

    it('should have a  nav', function() {
      var rule = output.rule('nav');
      
      expect(rule.prop('padding')).to.equal('1em');
      });

      it('should have a  aside elements + style', function() {
        var rule = output.rule('aside');
        
        expect(rule.prop('padding')).to.equal('1em');
        });
        
      
    

it('should have a header element + style', function() {
var rule = output.rule('header');

expect(rule.prop('background')).to.equal('yellowgreen');
expect(rule.prop('height')).to.equal('15vh');

});
it('should have a footer element + style', function() {
  var rule = output.rule('footer');
  
  expect(rule.prop('background')).to.equal('yellowgreen');
  expect(rule.prop('height')).to.equal('15vh');
  
  });

});