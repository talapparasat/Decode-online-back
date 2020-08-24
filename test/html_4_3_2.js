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
        expect(dom.window.document.getElementsByTagName('iframe')[0].getAttribute('src')).to.equal
        ("https://www.youtube.com/embed/OfWge0t0dk8?controls=0&autoplay=1&mute=1&loop=1");
    });

    it('3.Проверка источника',  function () {
        expect(dom.window.document.getElementsByTagName('iframe')[0].getAttribute('src')).to.equal
        ("https://www.youtube.com/embed/OfWge0t0dk8?controls=0&autoplay=1&mute=1&loop=1");
    });
    it('4.Проверка вопроизведения',  function () {
        expect(dom.window.document.getElementsByTagName('iframe')[0].getAttribute('src')).to.equal
        ("https://www.youtube.com/embed/OfWge0t0dk8?controls=0&autoplay=1&mute=1&loop=1");
    });


});

