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
        expect(dom.window.document.getElementsByTagName('source')).to.have.length(2);
    });
    it('2.Проверка управления',  function () {
        expect(dom.window.document.getElementsByTagName('video')[0].getAttribute('controls')).to.exist;
    });
    it('3.Проверка высоты и ширины',  function () {
        expect(parseInt(dom.window.document.getElementsByTagName('video')[0].getAttribute('height'))).to.gt(0);
        expect(parseInt(dom.window.document.getElementsByTagName('video')[0].getAttribute('width'))).to.gt(0);
    });
    it('4.Проверка источника',  function () {
        expect(dom.window.document.getElementsByTagName('source')[0].getAttribute('src')).to.equal("videos/featured/featured.ogg");
        expect(dom.window.document.getElementsByTagName('source')[0].getAttribute('type')).to.equal("video/ogg");
        expect(dom.window.document.getElementsByTagName('source')[1].getAttribute('src')).to.equal("videos/featured/featured.webm");
        expect(dom.window.document.getElementsByTagName('source')[1].getAttribute('type')).to.equal("video/webm");
    });
    it('5.Проверка воспроизведения',  function () {
        expect(dom.window.document.getElementsByTagName('video')[0].getAttribute('muted')).to.exist;
    });


});

