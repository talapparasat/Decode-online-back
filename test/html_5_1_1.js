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
    });
    it('2.Проверка файла сервера и методов',  function () {
        expect(dom.window.document.getElementsByTagName('form')[0].getAttribute('action')).to.equal("/search.php");
        expect(dom.window.document.getElementsByTagName('form')[0].getAttribute('method')).to.equal("get");
    });
    it('3.Проверка элементa input',  function () {
        expect(dom.window.document.getElementsByTagName('form')[0].children[0]).to.match("input");
        expect(dom.window.document.getElementsByTagName('form')[0].children[1]).to.match("input");
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('type')).to.equal("search");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('type')).to.equal("submit");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('value')).to.equal("Искать");

    });



});

