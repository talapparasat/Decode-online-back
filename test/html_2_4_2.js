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
    it('1.Проверка изоброжения',  function () {
        expect(dom.window.document.getElementsByTagName('img')).to.have.length(6);
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('src')).to.equal('http://tny.im/jCT');
        expect(dom.window.document.getElementsByTagName('img')[1].getAttribute('src')).to.equal('http://tny.im/jCS');
        expect(dom.window.document.getElementsByTagName('img')[2].getAttribute('src')).to.equal('http://tny.im/jCR');
        expect(dom.window.document.getElementsByTagName('img')[3].getAttribute('src')).to.equal('http://tny.im/jCU');
        expect(dom.window.document.getElementsByTagName('img')[4].getAttribute('src')).to.equal('http://tny.im/jCV');
        expect(dom.window.document.getElementsByTagName('img')[5].getAttribute('src')).to.equal('http://tny.im/jCW');
    });
    it('2.Проверка альтернативного названия',  function () {
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('alt')).to.equal('Манчестер Юнайтед');
        expect(dom.window.document.getElementsByTagName('img')[1].getAttribute('alt')).to.equal('Криштиану Роналду');
        expect(dom.window.document.getElementsByTagName('img')[2].getAttribute('alt')).to.equal('Футболная арена');
        expect(dom.window.document.getElementsByTagName('img')[3].getAttribute('alt')).to.equal('Игроки баскетбола');
        expect(dom.window.document.getElementsByTagName('img')[4].getAttribute('alt')).to.equal('Баскетбольная площадка');
        expect(dom.window.document.getElementsByTagName('img')[5].getAttribute('alt')).to.equal('Баскетбольное кольцо');
    });
    it('2.Проверка высоты',  function () {
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('height')).to.equal(
            dom.window.document.getElementsByTagName('img')[1].getAttribute('height')).but.to.equal
        (dom.window.document.getElementsByTagName('img')[2].getAttribute('height'));
        expect(dom.window.document.getElementsByTagName('img')[3].getAttribute('height')).to.equal(
            dom.window.document.getElementsByTagName('img')[4].getAttribute('height')).but.to.equal
        (dom.window.document.getElementsByTagName('img')[5].getAttribute('height'));
    });
        it('2.Проверка заголовков',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.match('h1');
        expect(dom.window.document.getElementsByTagName('body')[0].children[1]).to.match('h2');
        expect(dom.window.document.getElementsByTagName('body')[0].children[5]).to.match('h2');
    });
});

