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
    it('1.Проверка изоброжения',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('img')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('src')).to.equal('http://tny.im/jCP');
    });
    it('2.Проверка альтернативного названия',  function () {
        expect(dom.window.document.getElementsByTagName('img')[0].getAttribute('alt')).to.equal('Драконово дерево');
    });
});

