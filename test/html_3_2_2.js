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
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('body')[0].children[1]).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('body')[0].children[2]).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('details')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('img')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('p')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('summary')).to.have.length(3);
    });
    it('2.Проверка высоты',  function () {
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('height')).to.equal(
            dom.window.document.getElementsByTagName('img')[1].getAttribute('height')).but.to.equal
        (dom.window.document.getElementsByTagName('img')[2].getAttribute('height'));
    });
    it('3.Проверка альтернативного названия изображения',  function () {
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('alt')).to.equal('Карл Густав Юнг');
        expect(dom.window.document.getElementsByTagName('img')[1].getAttribute('alt')).to.equal('Зигмунд Фрейд');
        expect(dom.window.document.getElementsByTagName('img')[2].getAttribute('alt')).to.equal('Альфред Адлер');
    });
    it('4.Проверка  изображения',  function () {
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('src')).to.equal('http://tny.im/jEl');
        expect(dom.window.document.getElementsByTagName('img')[1].getAttribute('src')).to.equal('http://tny.im/jEm');
        expect(dom.window.document.getElementsByTagName('img')[2].getAttribute('src')).to.equal('http://tny.im/jEn');
    });
    it('5.Проверка элемента details',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0].getAttribute('open')).to.exist;
        expect(dom.window.document.getElementsByTagName('body')[0].children[1]).to.match('details');
        expect(dom.window.document.getElementsByTagName('body')[0].children[2]).to.match('details');

    });
    it('6.Проверка контента',  function () {
        expect(dom.window.document.getElementsByTagName('summary')[0]).to.contain.html('Карл Густав Юнг');
        expect(dom.window.document.getElementsByTagName('p')[0].innerHTML.length).to.be.gte(180);
        expect(dom.window.document.getElementsByTagName('summary')[1]).to.contain.html('Зигмунд Фрейд');
        expect(dom.window.document.getElementsByTagName('p')[1].innerHTML.length).to.be.gte(223);
        expect(dom.window.document.getElementsByTagName('summary')[2]).to.contain.html('Альфред Адлер');
        expect(dom.window.document.getElementsByTagName('p')[2].innerHTML.length).to.be.gte(285);
    });
});

