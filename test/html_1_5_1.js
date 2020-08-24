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
    it('1.Название документа',  function () {
        expect(dom.window.document.getElementsByTagName('title')[0]).to.contain.html('Моя первая HTML страница');
    });
    it('2.Объяыление элемента meta',  function () {
        expect(dom.window.document.getElementsByTagName('meta')[0]).to.exist;
        expect(dom.window.document.getElementsByTagName('meta')[0]).to.have.attr('charset').match(/utf-8/);

    });
    it('3.Пустота элемента body',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.be.empty;
    });

});





