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
    it('1.Количество заголовков',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(6);

    });
    it('2.Проверка первого заголовка',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.match('h1');
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.contain.html('Заголовок 1-го уровня');
    });
    it('3.Проверка второго заголовка',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[1]).to.match('h2');
        expect(dom.window.document.getElementsByTagName('body')[0].children[1]).to.contain.html('Заголовок 2-го уровня');
    });
    it('4.Проверка третьего заголовка',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[2]).to.match('h3');
        expect(dom.window.document.getElementsByTagName('body')[0].children[2]).to.contain.html('Заголовок 3-го уровня');
    });
    it('5.Проверка четвертого заголовка',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[3]).to.match('h4');
        expect(dom.window.document.getElementsByTagName('body')[0].children[3]).to.contain.html('Заголовок 4-го уровня');
    });
    it('6.Проверка пятого заголовка',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[4]).to.match('h5');
        expect(dom.window.document.getElementsByTagName('body')[0].children[4]).to.contain.html('Заголовок 5-го уровня');
    });
    it('7.Проверка шестого заголовка',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[5]).to.match('h6');
        expect(dom.window.document.getElementsByTagName('body')[0].children[5]).to.contain.html('Заголовок 6-го уровня');
    });

});

