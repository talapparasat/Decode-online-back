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
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.have.length(0);
        expect(dom.window.document.getElementsByTagName('form')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('input')).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('select')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('option')).to.have.length(5);
        expect(dom.window.document.getElementsByTagName('button')).to.have.length(1);
    });
    it('2.Проверка файла сервера и методов',  function () {
        expect(dom.window.document.getElementsByTagName('form')[0].getAttribute('action')).to.equal("buy.php");
    });
    it('3.Проверка элементa select',  function () {
        expect(dom.window.document.getElementsByTagName('select')[0].getAttribute('name')).to.equal("domain_zone");
        expect(dom.window.document.getElementsByTagName('select')[0].getAttribute('id')).to.equal("domain_zone");
    });
    it('4.Проверка элементa button',  function () {
        expect(dom.window.document.getElementsByTagName('button')[0].getAttribute('onclick')).to.equal("checkDomain()");
    });

    it('5.Проверка элементa input',  function () {
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('type')).to.equal("text");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('type')).to.equal("submit");
    });

});

