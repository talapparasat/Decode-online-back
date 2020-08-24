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
        expect(dom.window.document.getElementsByTagName('form')[0].children[0]).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('input')).to.have.length(5);
        expect(dom.window.document.getElementsByTagName('li')).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('ul')).to.have.length(1);
    });

    it('2.Проверка первой пары элементов input',  function () {
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('type')).to.equal("radio");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('type')).to.equal("range");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('min')).to.equal("0");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('max')).to.equal("10");
        expect(dom.window.document.getElementsByTagName('input')[1].getAttribute('value')).to.equal("5");
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('name')).to.not.empty;
    });
    it('3.Проверка первой пары элементов input',  function () {
        expect(dom.window.document.getElementsByTagName('input')[2].getAttribute('type')).to.equal("radio");
        expect(dom.window.document.getElementsByTagName('input')[3].getAttribute('type')).to.equal("range");
        expect(dom.window.document.getElementsByTagName('input')[3].getAttribute('min')).to.equal("0");
        expect(dom.window.document.getElementsByTagName('input')[3].getAttribute('max')).to.equal("10");
        expect(dom.window.document.getElementsByTagName('input')[3].getAttribute('value')).to.equal("5");
        expect(dom.window.document.getElementsByTagName('input')[2].getAttribute('name')).to.not.empty;
    });
    it('4.Проверка атрибута name',  function () {
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('name')).to.not.equal(
            dom.window.document.getElementsByTagName('input')[2].getAttribute('name')
        );

    });
    it('5.Проверка элементa input',  function () {
        expect(dom.window.document.getElementsByTagName('input')[4].getAttribute('type')).to.equal("reset");
        expect(dom.window.document.getElementsByTagName('input')[4]u.getAttribute('value')).to.equal("Сбросить");
    });




});

