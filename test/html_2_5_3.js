require('mocha');
require('chai');
var chai = require('chai')
chai.use(require('chai-dom'))
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const expect = require('chai').expect;

var domcontent = "SarinovSarinov";
const dom = new JSDOM(domcontent);
console.log(dom.window.document.getElementsByTagName('body')[0].children.length);
describe('First test: ', async () => {
    it('1.Количество элементов',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children.length).to.be.gte(2);
        expect(dom.window.document.getElementsByTagName('body')[0].children.length).to.be.lt(4);
        expect(dom.window.document.getElementsByTagName('a')).to.have.length(2);
    });
    it('2.Проверка первой ссылки',  function () {
        expect(dom.window.document.getElementsByTagName('a')[0].getAttribute('href')).to.equal('products.html');
        expect(dom.window.document.getElementsByTagName('a')[0].getAttribute('target')).to.equal('_self');
    });
    it('2.Проверка второй ссылки',  function () {
        expect(dom.window.document.getElementsByTagName('a')[1].getAttribute('href')).to.equal('about.html');
        expect(dom.window.document.getElementsByTagName('a')[1].getAttribute('target')).to.equal('_blank');
    });
});