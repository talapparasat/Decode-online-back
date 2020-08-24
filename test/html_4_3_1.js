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
        expect(dom.window.document.getElementsByTagName('iframe')).to.have.length(1);
    });
    it('2.Проверка управления',  function () {
        expect(dom.window.document.getElementsByTagName('iframe')[0].getAttribute('src')).to.equal("https://www.youtube.com/embed/kQjtK32mGJQ?controls=1");
    });
    it('3.Проверка высоты и ширины',  function () {
        expect(dom.window.document.getElementsByTagName('iframe')[0].getAttribute('height')).to.equal("315");
        expect(dom.window.document.getElementsByTagName('iframe')[0].getAttribute('width')).to.equal("600");
    });
    it('4.Проверка источника',  function () {
        expect(dom.window.document.getElementsByTagName('iframe')[0].getAttribute('src')).to.equal("https://www.youtube.com/embed/kQjtK32mGJQ?controls=1");
    });
    it('5.Проверка границ',  function () {
        expect(dom.window.document.getElementsByTagName('iframe')[0].getAttribute('frameborder')).to.equal("0");
    });


});

