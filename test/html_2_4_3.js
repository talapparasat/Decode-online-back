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
    it('1.Количество изоброжении',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('img')).to.have.length(2);
    });
    it('2.Проверка первого изоброжения',  function () {
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('src')).to.equal('images/basketball/basketball-hoop.jpg');
        expect(dom.window.document.getElementsByTagName('img')[0]).to.have.attr('alt');
    });
    it('2.Проверка второго изоброжения',  function () {
        expect(dom.window.document.getElementsByTagName('img')[1].getAttribute('src')).to.equal('images/football/Cristiano-Ronaldo.jpg');
        expect(dom.window.document.getElementsByTagName('img')[1]).to.have.attr('alt');

    });
});

