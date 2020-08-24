
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
        expect(dom.window.document.getElementsByTagName('body')[0].children[2]).to.have.length(5);
        expect(dom.window.document.getElementsByTagName('ol')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('li')).to.have.length(5);
    });
    it('2.Проверка заголовка',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.contain.html('Страны мира');
        expect(dom.window.document.getElementsByTagName('body')[0].children[1]).to.contain.html('Страница 2');
    });
    it('2.Проверка cписка',  function () {
        expect(dom.window.document.getElementsByTagName('ol')[0].getAttribute('start')).to.equal('15');
        expect(dom.window.document.getElementsByTagName('li')[0].innerHTML).to.equal('Белоруссия');
        expect(dom.window.document.getElementsByTagName('ol')[0].children[1]).to.contain.html('Белиз');
        expect(dom.window.document.getElementsByTagName('ol')[0].children[2]).to.contain.html('Бельгия');
        expect(dom.window.document.getElementsByTagName('ol')[0].children[3]).to.contain.html('Болгария');
        expect(dom.window.document.getElementsByTagName('ol')[0].children[4]).to.contain.html('Боливия');
    });
});

