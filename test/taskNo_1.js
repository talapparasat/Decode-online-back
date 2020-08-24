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
        it('fisrst element shoulde be h1',  function () {
            expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.match('h1');
        });
        it('fisrst element shoulde be h1',  function () {
            expect(dom.window.document.getElementsByTagName('body')[0].children[1]).to.match('p');
        });

    });





