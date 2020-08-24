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
    it('1.Количество параграфов',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('p')).to.have.length(1);
    });
    it('2.Количество сбросов строки',  function () {
        expect(dom.window.document.getElementsByTagName('br')).to.have.length(5);
    });
    it('3.Проверка параграфа',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.content.html("Сериков Марат Дуйсенович");
    });

});

