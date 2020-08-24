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
        expect(dom.window.document.getElementsByTagName('body')[0].children[0].children).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('tr')).to.have.length(7);
        expect(dom.window.document.getElementsByTagName('th')).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('td')).to.have.length(12);
        expect(dom.window.document.getElementsByTagName('caption')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('table')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('table')[0].children).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('thead')).to.be.empty;
        expect(dom.window.document.getElementsByTagName('tbody ')).to.be.empty;
        expect(dom.window.document.getElementsByTagName('tfoot ')).to.be.empty;
    });
    it('2.Проверка caption',  function () {
        expect(dom.window.document.getElementsByTagName('table')[0].children[0]).to.match('caption');

    });
    it('3.Проверка первой строк',  function () {
        expect(dom.window.document.getElementsByTagName('tr')[0].children[0]).to.match('th');
        expect(dom.window.document.getElementsByTagName('tr')[0].children[1]).to.match('th');
    });
    it('4.Проверка всех строк',  function () {
        expect(dom.window.document.getElementsByTagName('tr')[1].children[0]).to.match('td');
        expect(dom.window.document.getElementsByTagName('tr')[1].children[1]).to.match('td');
        expect(dom.window.document.getElementsByTagName('tr')[2].children[1]).to.match('td');
        expect(dom.window.document.getElementsByTagName('tr')[2].children[1]).to.match('td');
        expect(dom.window.document.getElementsByTagName('tr')[3].children[1]).to.match('td');
        expect(dom.window.document.getElementsByTagName('tr')[3].children[1]).to.match('td');
        expect(dom.window.document.getElementsByTagName('tr')[4].children[1]).to.match('td');
        expect(dom.window.document.getElementsByTagName('tr')[4].children[1]).to.match('td');
        expect(dom.window.document.getElementsByTagName('tr')[5].children[1]).to.match('td');
        expect(dom.window.document.getElementsByTagName('tr')[5].children[1]).to.match('td');
        expect(dom.window.document.getElementsByTagName('tr')[6].children[1]).to.match('td');
        expect(dom.window.document.getElementsByTagName('tr')[6].children[1]).to.match('td');
    });

    it('5.Проверка названии колон',  function () {
        expect(dom.window.document.getElementsByTagName('th')[0]).to.contain.html('Тег');
        expect(dom.window.document.getElementsByTagName('th')[1]).to.contain.html('Значение');
    });
    it('6.Проверка контента',  function () {
        expect(dom.window.document.getElementsByTagName('td')[0]).to.contain.html('p');
        expect(dom.window.document.getElementsByTagName('td')[1]).to.contain.html('Абзац');
        expect(dom.window.document.getElementsByTagName('td')[2]).to.contain.html('a');
        expect(dom.window.document.getElementsByTagName('td')[3]).to.contain.html('Ссылка');
        expect(dom.window.document.getElementsByTagName('td')[4]).to.contain.html('table');
        expect(dom.window.document.getElementsByTagName('td')[5]).to.contain.html('Таблица');
        expect(dom.window.document.getElementsByTagName('td')[6]).to.contain.html('tr');
        expect(dom.window.document.getElementsByTagName('td')[7]).to.contain.html('Ряд таблицы');
        expect(dom.window.document.getElementsByTagName('td')[8]).to.contain.html('td');
        expect(dom.window.document.getElementsByTagName('td')[9]).to.contain.html('Ячейка таблицы');
        expect(dom.window.document.getElementsByTagName('td')[10]).to.contain.html('th');
        expect(dom.window.document.getElementsByTagName('td')[11]).to.contain.html('Заголовок таблицы');
    });
});

