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
        expect(dom.window.document.getElementsByTagName('video')).to.have.length(1);
    });
    it('2.Проверка управления',  function () {
        expect(dom.window.document.getElementsByTagName('video')[0].getAttribute('controls')).to.exist;
    });
    it('3.Проверка высоты и ширины',  function () {
        expect(dom.window.document.getElementsByTagName('video')[0].getAttribute('height')).to.equal("500");
        expect(dom.window.document.getElementsByTagName('video')[0].getAttribute('width')).to.equal("500");
    });
    it('4.Проверка источника',  function () {
        expect(dom.window.document.getElementsByTagName('video')[0].getAttribute('src')).to.equal("videos/somevideo.mp4");
        expect(dom.window.document.getElementsByTagName('source')[0]).not.to.exist;
    });


});

