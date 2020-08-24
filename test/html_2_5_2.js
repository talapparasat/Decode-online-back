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
    it('1.Количество ссылок',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('a')).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('a')[0]).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('a')[1]).to.have.length(1);

    });
    it('2.Проверка высоты',  function () {
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('height')).to.equal(
            dom.window.document.getElementsByTagName('img')[1].getAttribute('height'));
    });
    it('3.Проверка первой ссылки',  function () {
        expect(dom.window.document.getElementsByTagName('a')[0].getAttribute('href')).to.equal('https://www.facebook.com');
        expect(dom.window.document.getElementsByTagName('a')[0].getAttribute('title')).to.equal('Перейти в Facebook');
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('src')).to.equal('http://tny.im/jCZ');


    });
    it('4.Проверка второй ссылки',  function () {
        expect(dom.window.document.getElementsByTagName('a')[1].getAttribute('href')).to.equal('https://www.twitter.com');
        expect(dom.window.document.getElementsByTagName('a')[1].getAttribute('title')).to.equal('Перейти в Twitter');
        expect(dom.window.document.getElementsByTagName('img')[1].getAttribute('src')).to.equal('http://tny.im/jC-');

    });

});

