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
    it('1.Проверка параграфа',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('p')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.match('p');
    });
    it('2.Проверка ссылки',  function () {
        expect(dom.window.document.getElementsByTagName('p')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('body')[0].children[0].children[0]).to.match('a');
        expect(dom.window.document.getElementsByTagName('a')[0].getAttribute('href')).to.equal('https://ru.wikipedia.org/wiki/HTML');
        expect(dom.window.document.getElementsByTagName('a')[0].getAttribute('title')).to.equal('Читать подробнее о HTML в Википедии');

    });
});

