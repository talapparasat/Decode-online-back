
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
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('body')[0].children[1]).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('ol')).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('ul')).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('li')).to.have.length(11);
        expect(dom.window.document.querySelectorAll("body > ol > li")).to.have.length(3);
        expect(dom.window.document.querySelectorAll("body > ol > li:first-child >ol >li")).to.have.length(3);
        expect(dom.window.document.querySelectorAll("body > ol > li:first-child>ol>li:nth-child(2) > ul >li")).to.have.length(3);
        expect(dom.window.document.querySelectorAll("body > ol > li:first-child>ol>li:nth-child(3) > ul >li")).to.have.length(2);
        expect(dom.window.document.querySelectorAll("body > ol > li:nth-child(2)")[0].children).to.have.length(0);
        expect(dom.window.document.querySelectorAll("body > ol > li:nth-child(3)")[0].children).to.have.length(0);
    });
    it('2.Проверка заголовка',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.contain.html('План курса HTML');
    });
    it('3.Проверка первого cписка',  function () {
        expect(dom.window.document.querySelectorAll("body > ol > li:nth-child(1)")[0]).to.contain.html('Введение');
        expect(dom.window.document.querySelectorAll("body > ol > li:nth-child(2)")[0]).to.contain.html('Основные теги');
        expect(dom.window.document.querySelectorAll("body > ol > li:nth-child(3)")[0]).to.contain.html('Списки и таблицы');

    });
    it('4.Проверка второго cписка',  function () {
        expect(dom.window.document.querySelectorAll("body > ol > li:first-child >ol >li")[0]).to.contain.html('О JSRush');
        expect(dom.window.document.querySelectorAll("body > ol > li:first-child >ol >li")[1]).to.contain.html('Что такое HTML');
        expect(dom.window.document.querySelectorAll("body > ol > li:first-child >ol >li")[2]).to.contain.html('Элементы и атрибуты');

    });
    it('5.Проверка третьего cписка',  function () {
        expect(dom.window.document.querySelectorAll("body > ol > li:first-child>ol>li:nth-child(2) > ul >li")[0]).to.contain.html('Слова HTML');
        expect(dom.window.document.querySelectorAll("body > ol > li:first-child>ol>li:nth-child(2) > ul >li")[1]).to.contain.html('История HTML');
        expect(dom.window.document.querySelectorAll("body > ol > li:first-child>ol>li:nth-child(2) > ul >li")[2]).to.contain.html('HTML5');

    });
    it('6.Проверка четвертого cписка',  function () {
        expect(dom.window.document.querySelectorAll("body > ol > li:first-child>ol>li:nth-child(3) > ul >li")[0]).to.contain.html('Заголовки h1-h6');
        expect(dom.window.document.querySelectorAll("body > ol > li:first-child>ol>li:nth-child(3) > ul >li")[1]).to.contain.html('Элемент p');

    });
});

