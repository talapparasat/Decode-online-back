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
        expect(dom.window.document.getElementsByTagName('select')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('select')[0]).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('select')[1]).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('select')[2]).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('option')).to.have.length(8);
        expect(dom.window.document.getElementsByTagName('input')).to.have.length(1);
    });
    it('2.Проверка файла сервера и методов',  function () {
        expect(dom.window.document.getElementsByTagName('form')[0].getAttribute('action')).to.equal("/order.php");
    });
    it('3.Проверка первого элементa select',  function () {
        expect(dom.window.document.getElementsByTagName('select')[0].getAttribute('name')).to.equal("hotdishes");
        expect(dom.window.document.getElementsByTagName('select')[0].children[0].getAttribute('value')).to.equal("1");
        expect(dom.window.document.getElementsByTagName('select')[0].children[0]).to.contain.html("Баклажановый гратен");
        expect(dom.window.document.getElementsByTagName('select')[0].children[1].getAttribute('value')).to.equal("2");
        expect(dom.window.document.getElementsByTagName('select')[0].children[1]).to.contain.html("Овощная котлета");
        expect(dom.window.document.getElementsByTagName('select')[0].children[2].getAttribute('value')).to.equal("3");
        expect(dom.window.document.getElementsByTagName('select')[0].children[2]).to.contain.html("Пельмени");
    });
    it('4.Проверка второго элементa select',  function () {
        expect(dom.window.document.getElementsByTagName('select')[1].getAttribute('name')).to.equal("soup");
        expect(dom.window.document.getElementsByTagName('select')[1].getAttribute('multiple')).to.exist;
        expect(dom.window.document.getElementsByTagName('select')[1].children[0].getAttribute('value')).to.equal("1");
        expect(dom.window.document.getElementsByTagName('select')[1].children[0]).to.contain.html("Тыквенный");
        expect(dom.window.document.getElementsByTagName('select')[1].children[1].getAttribute('value')).to.equal("2");
        expect(dom.window.document.getElementsByTagName('select')[1].children[1]).to.contain.html("Борщ");
        expect(dom.window.document.getElementsByTagName('select')[1].children[2].getAttribute('value')).to.equal("3");
        expect(dom.window.document.getElementsByTagName('select')[1].children[2]).to.contain.html("Суп из морепродуктов");
    });
    it('5.Проверка третьего элементa select',  function () {
        expect(dom.window.document.getElementsByTagName('select')[2].getAttribute('name')).to.equal("drink");
        expect(dom.window.document.getElementsByTagName('select')[2].children[0].getAttribute('value')).to.equal("1");
        expect(dom.window.document.getElementsByTagName('select')[2].children[0]).to.contain.html("Апельсин");
        expect(dom.window.document.getElementsByTagName('select')[2].children[1].getAttribute('value')).to.equal("2");
        expect(dom.window.document.getElementsByTagName('select')[2].children[1]).to.contain.html("Грейпфрут");
        expect(dom.window.document.getElementsByTagName('select')[2].children[1].getAttribute('selected')).to.exist;

    });
    it('6.Проверка элементa input', function () {
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('type')).to.equal("submit");
        expect(dom.window.document.getElementsByTagName('input')[0].getAttribute('value')).to.equal("Заказать");
    });
});

