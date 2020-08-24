
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
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.have.length(6);
        expect(dom.window.document.getElementsByTagName('dt')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('dd')).to.have.length(3);
    });
    it('2.Проверка терминов',  function () {
        expect(dom.window.document.getElementsByTagName('dl')[0].children[0]).to.match('dt');
        expect(dom.window.document.getElementsByTagName('dl')[0].children[1]).to.match('dd');
        expect(dom.window.document.getElementsByTagName('dl')[0].children[2]).to.match('dt');
        expect(dom.window.document.getElementsByTagName('dl')[0].children[3]).to.match('dd');
        expect(dom.window.document.getElementsByTagName('dl')[0].children[4]).to.match('dt');
        expect(dom.window.document.getElementsByTagName('dl')[0].children[5]).to.match('dd');
    });
    it('2.Проверка контента',  function () {
        expect(dom.window.document.getElementsByTagName('dl')[0].children[0]).to.contain.html('Google');
        expect(dom.window.document.getElementsByTagName('dl')[0].children[1].innerHTML.length).to.be.gte(133);
        expect(dom.window.document.getElementsByTagName('dl')[0].children[2]).to.contain.html('Firefox');
        expect(dom.window.document.getElementsByTagName('dl')[0].children[3].innerHTML.length).to.be.gte(170);
        expect(dom.window.document.getElementsByTagName('dl')[0].children[4]).to.contain.html('Opera');
        expect(dom.window.document.getElementsByTagName('dl')[0].children[5].innerHTML.length).to.be.gte(175);
    });
});

