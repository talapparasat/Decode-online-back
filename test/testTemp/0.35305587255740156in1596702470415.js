require('mocha');
require('chai');
var chai = require('chai')
chai.use(require('chai-dom'))
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const expect = require('chai').expect;
const have = require('chai-dom').have;

var content_from_user = "<!DOCTYPE html><html>	<body>  	</body></html>";
var domcontent = " <!DOCTYPE html>\n" +
    "<html>\n" +
    "   <head>\n" +
    "       <title>Название страницы</title>\n" +
    " \t   <meta charset=\"UTF-8\">\n" +
    "   </head>\n" +
    "   <body>\n" +
    "forReplase" +
    "   </body>\n" +
    "</html>\n";

domcontent = domcontent.replace("forReplase", content_from_user);
const dom = new JSDOM(domcontent);
describe('First test: ', async () => {
    it('1.Создать элемент ul',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.match('ul');
    });
    it('2.Количество li',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.have.length(3);
    });
    it('3.Контент первого li',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0].children[0]).to.contain.html('Элемент 1');
    });
    it('4.Контент второго li',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0].children[1]).to.contain.html('Элемент 2');
    });
    it('5.Контент третьего li',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0].children[2]).to.contain.html('Элемент 3');
    });

});





