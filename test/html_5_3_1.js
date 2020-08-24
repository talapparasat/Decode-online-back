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
        expect(dom.window.document.getElementsByTagName('form')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('form')[0].children[0]).to.have.length(0);
        expect(dom.window.document.getElementsByTagName('input')).to.have.length(4);
    });

    it('2.Проверка первого элементa input',  function () {
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('type')).to.equal("radio");
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('value')).to.equal("email");
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('name')).to.equal("contact");
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('checked')).to.exist;
    });
    it('3.Проверка второго элементa input',  function () {
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('type')).to.equal("radio");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('value')).to.equal("phone");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('name')).to.equal("contact");
    });

    it('4.Проверка третьего элементa input',  function () {
        expect(dom.window.document.getElementsByTagName('input')[2].getAttribute('type')).to.equal("radio");
        expect(dom.window.document.getElementsByTagName('input')[2].getAttribute('value')).to.equal("mail");
        expect(dom.window.document.getElementsByTagName('input')[2].getAttribute('name')).to.equal("contact");
    });
    it('5.Проверка четвертого элементa input',  function () {
        expect(dom.window.document.getElementsByTagName('input')[3].getAttribute('type')).to.equal("submit");
        expect(dom.window.document.getElementsByTagName('input')[3].getAttribute('value')).to.equal("Отправить");
    });



});

