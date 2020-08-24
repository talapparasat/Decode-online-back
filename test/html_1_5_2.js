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
    it('1.Метаданная указывающая автора страницы',  function () {
        expect(dom.window.document.querySelector('meta[name="author"]').getAttribute('content')).not.to.be.empty;
    });
    it('2.Метаданная определяющуа краткое описание страницы',  function () {
        expect(dom.window.document.querySelector('meta[name="description"]').getAttribute('content')).to.equal('Сайт о HTML, о элементах и атрибутах');
    });
    it('3.Пустота элемента body',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.be.empty;

    });

});

