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
        expect(dom.window.document.getElementsByTagName('input')).to.have.length(4);
    });
    it('2.Проверка файла сервера и методов',  function () {
        expect(dom.window.document.getElementsByTagName('form')[0].getAttribute('action')).to.equal("/register.php");
        expect(dom.window.document.getElementsByTagName('form')[0].getAttribute('method')).to.equal("post");
    });
    it('3.Проверка элементa input',  function () {
        // expect(dom.window.document.getElementsByTagName('form')[0].children[0]).to.match("input");
        // expect(dom.window.document.getElementsByTagName('form')[0].children[1]).to.match("input");
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('type')).to.equal("email");
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('placeholder')).to.equal("Email");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('type')).to.equal("password");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('placeholder')).to.equal("Пароль");
        expect(dom.window.document.getElementsByTagName('input')[2].getAttribute('type')).to.equal("password");
        expect(dom.window.document.getElementsByTagName('input')[2].getAttribute('placeholder')).to.equal("Повторите пароль");
        expect(dom.window.document.getElementsByTagName('input')[3].getAttribute('type')).to.equal("submit");
        expect(dom.window.document.getElementsByTagName('input')[3].getAttribute('value')).to.equal("Зарегистрироваться");

    });



});

