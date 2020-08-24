require('mocha');
require('chai');
var chai = require('chai')
chai.use(require('chai-dom'))
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const expect = require('chai').expect;

var domcontent = "SarinovSarinov";
const dom = new JSDOM(domcontent);


describe('First test: ', async () => {
    it('1.Количество элементов',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('audio')).to.have.length(1);
    });
    it('2.Проверка управления',  function () {
        expect(dom.window.document.getElementsByTagName('audio')[0].getAttribute('controls')).to.exist;
    });
    it('4.Проверка источника',  function () {
        expect(dom.window.document.getElementsByTagName('audio')[0].getAttribute('src')).to.equal("whistle.mp3");
    });
    it('5.Проверка методанных',  function () {
        expect(dom.window.document.getElementsByTagName('audio')[0].getAttribute('preload')).to.equal("metadata");
    });


});

