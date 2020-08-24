require('mocha');
require('chai');
var chai = require('chai')
chai.use(require('chai-dom'))
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const expect = require('chai').expect;
                                                        // ne gotovooooooooooooooooooooo
                                                        // ne gotovooooooooooooooooooooo
                                                        // ne gotovooooooooooooooooooooo
                                                        // ne gotovooooooooooooooooooooo
                                                        // ne gotovooooooooooooooooooooo
var domcontent = "SarinovSarinov";
const dom = new JSDOM(domcontent);
describe('First test: ', async () => {
    it('1.Количество элементов',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(4);
        expect(dom.window.document.getElementsByTagName('body')[0].children[1]).to.have.length(4);
        expect(dom.window.document.getElementsByTagName('body')[0].children[2]).to.have.length(4);
        expect(dom.window.document.getElementsByTagName('body')[0].children[3]).to.have.length(4);
        expect(dom.window.document.getElementsByTagName('details')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('summary')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('img')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('hr')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('dl')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('dd')).to.have.length(9);
        expect(dom.window.document.getElementsByTagName('dt')).to.have.length(9);
    });
    it('2.Проверка высоты',  function () {
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('height')).to.equal('40');
        expect(dom.window.document.getElementsByTagName('img')[1].getAttribute('height')).to.equal('40');
        expect(dom.window.document.getElementsByTagName('img')[2].getAttribute('height')).to.equal('40');

    });
    it('3.Проверка альтернативного названия изображения',  function () {
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('alt')).to.equal('Флаг Великобританий');
        expect(dom.window.document.getElementsByTagName('img')[1].getAttribute('alt')).to.equal('Флаг Германий');
        expect(dom.window.document.getElementsByTagName('img')[2].getAttribute('alt')).to.equal('Флаг Канады');
    });
    it('4.Проверка  изображения',  function () {
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('src')).to.equal('http://tny.im/jEr');
        expect(dom.window.document.getElementsByTagName('img')[1].getAttribute('src')).to.equal('http://tny.im/jEq');
        expect(dom.window.document.getElementsByTagName('img')[2].getAttribute('src')).to.equal('http://tny.im/jEp');
    });
    it('5.Проверка элемента details',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[1].getAttribute('open')).to.exist;
        expect(dom.window.document.getElementsByTagName('body')[0].children[2]).to.match('details');
        expect(dom.window.document.getElementsByTagName('body')[0].children[3]).to.match('details');

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

