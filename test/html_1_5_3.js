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
    it('1.Метаданная указывающая ключевые слова документа',  function () {
        expect(dom.window.document.querySelector('meta[name="keywords"]').getAttribute('content')).not.to.be.empty;
    });
    it('2.Метаданная обновляющая страницу каждые три минуты',  function () {
        expect(dom.window.document.querySelector('meta[http-equiv="refresh"]').getAttribute('content')).to.equal('180');
    });
    it('3.Пустота элемента body',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.be.empty;
    });

});

