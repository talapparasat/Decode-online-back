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
    it('1.Создать элемент a',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0]).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.match('a');
    });
    it('2.Ссылка на гугл',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.have.attr('href').match(/https:\/\/www.google.com/);
    });
    it('3.Контент тега',  function () {
        expect(dom.window.document.getElementsByTagName('body')[0].children[0]).to.contain.html('Перейти в Google');
    });

});





