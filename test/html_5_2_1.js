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
        expect(dom.window.document.getElementsByTagName('textarea')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('p')).to.have.length(2);
    });
    it('2.Проверка файла сервера и методов',  function () {
        expect(dom.window.document.getElementsByTagName('form')[0].getAttribute('action')).to.equal("/consultation.php");
        expect(dom.window.document.getElementsByTagName('form')[0].getAttribute('method')).to.equal("post");
    });
    it('3.Проверка элементa input',  function () {
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('name')).to.equal("email");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('type')).to.equal("submit");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('value')).to.equal("Отправить письмо");
    });
    it('4.Проверка элементa textarea',  function () {
        expect(dom.window.document.getElementsByTagName('textarea')[0].getAttribute('name')).to.equal("message");
        expect(dom.window.document.getElementsByTagName('textarea')[0].getAttribute('cols')).to.equal("40");
        expect(dom.window.document.getElementsByTagName('textarea')[0].getAttribute('rows')).to.equal("5");
    });
    it('5.Проверка параграфов',  function () {
        expect(dom.window.document.getElementsByTagName('form')[0].children[0]).to.match("p");
        expect(dom.window.document.getElementsByTagName('form')[0].children[2]).to.match("p");
        expect(dom.window.document.getElementsByTagName('p')[0]).to.contain.html("Ваш e-mail");
        expect(dom.window.document.getElementsByTagName('p')[1]).to.contain.html("Сообщения");

    });

});

