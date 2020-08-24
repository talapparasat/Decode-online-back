
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
        expect(dom.window.document.getElementsByTagName('body')[0].children[1]).to.have.length(5);
        expect(dom.window.document.getElementsByTagName('ul')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('li')).to.have.length(5);
    });
    it('2.Проверка заголовка',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.match('h2');
    });
    it('2.Проверка cписка',  function () {
        expect(dom.window.document.getElementsByTagName('li')[0].innerHTML).to.equal('Красный');
        expect(dom.window.document.getElementsByTagName('ul')[0].children[1]).to.contain.html('Зеленый');
        expect(dom.window.document.getElementsByTagName('ul')[0].children[2]).to.contain.html('Синий');
        expect(dom.window.document.getElementsByTagName('ul')[0].children[3]).to.contain.html('Желтый');
        expect(dom.window.document.getElementsByTagName('ul')[0].children[4]).to.contain.html('Черный');
    });
});

