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
    it('1.Нaзвание страницы',  function () {
        expect(dom.window.document.getElementsByTagName('title')[0]).to.have.text("Веб-приложения");
    });
    it('2.Проыерка всех параграфов',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(9);

        expect(dom.window.document.getElementsByTagName('p')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('body')[0].children[4]).to.match('p');
        expect(dom.window.document.getElementsByTagName('body')[0].children[4].innerHTML).to.have.lengthOf.be.gt(111);
        expect(dom.window.document.getElementsByTagName('body')[0].children[7]).to.match('p');
        expect(dom.window.document.getElementsByTagName('body')[0].children[7].innerHTML).to.have.lengthOf.be.gt(127);
        expect(dom.window.document.getElementsByTagName('body')[0].children[8]).to.match('p');
        expect(dom.window.document.getElementsByTagName('body')[0].children[8].innerHTML).to.have.lengthOf.be.gt(255);

    });
    it('3.Проверка всех загаловков',  function () {
        expect(dom.window.document.getElementsByTagName('h1')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('h2')).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.match('h1');
        expect(dom.window.document.getElementsByTagName('body')[0].children[3]).to.match('h2');
        expect(dom.window.document.getElementsByTagName('body')[0].children[6]).to.match('h2');

    });
    it('3.Проверка всех линии',  function () {
        expect(dom.window.document.getElementsByTagName('hr')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('body')[0].children[1]).to.match('hr');
        expect(dom.window.document.getElementsByTagName('body')[0].children[2]).to.match('hr');
        expect(dom.window.document.getElementsByTagName('body')[0].children[5]).to.match('hr');

    });

});

