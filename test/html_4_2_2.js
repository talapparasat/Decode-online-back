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
        expect(dom.window.document.getElementsByTagName('audio')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('source')).to.have.length(2);
        expect(dom.window.document.getElementsByTagName('p')).to.have.length(3);
        expect(dom.window.document.getElementsByTagName('ul')).to.have.length(1);
        expect(dom.window.document.getElementsByTagName('li')).to.have.length(3);
    });
    it('2.Проверка управления',  function () {
        expect(dom.window.document.getElementsByTagName('audio')[0].getAttribute('controls')).to.exist;
        expect(dom.window.document.getElementsByTagName('audio')[1].getAttribute('controls')).to.exist;
        expect(dom.window.document.getElementsByTagName('audio')[2].getAttribute('controls')).to.exist;
    });
    it('4.Проверка первого аудио',  function () {
        expect(dom.window.document.getElementsByTagName('li')[0].children[1]).to.match("audio");
        expect(dom.window.document.getElementsByTagName('audio')[0].getAttribute('preload')).to.equal("auto");
        expect(dom.window.document.getElementsByTagName('audio')[0].getAttribute('autoplay')).to.exist;
        expect(dom.window.document.getElementsByTagName('audio')[0].children[0]).to.match("source");
        expect(dom.window.document.getElementsByTagName('source')[0].getAttribute("src")).to.equal("audios/whistle.mp3");
        expect(dom.window.document.getElementsByTagName('source')[0].getAttribute("type")).to.equal("audio/mp3");
        expect(dom.window.document.getElementsByTagName('audio')[0].children[1]).to.match("source");
        expect(dom.window.document.getElementsByTagName('source')[1].getAttribute("src")).to.equal("audios/whistle.ogg");
        expect(dom.window.document.getElementsByTagName('source')[1].getAttribute("type")).to.equal("audio/ogg");

    });
    it('5.Проверка второго аудио',  function () {
        expect(dom.window.document.getElementsByTagName('li')[2].children[1]).to.match("audio");
        expect(dom.window.document.getElementsByTagName('audio')[1].getAttribute("src")).to.equal("audios/rain.mp3");
        expect(dom.window.document.getElementsByTagName('audio')[1].getAttribute("preload")).to.equal("meta");



    });
    it('6.Проверка третьего аудио',  function () {
        expect(dom.window.document.getElementsByTagName('li')[2].children[1]).to.match("audio");
        expect(dom.window.document.getElementsByTagName('audio')[2].getAttribute("src")).to.equal("audios/lightning.mp3");
        expect(dom.window.document.getElementsByTagName('audio')[2].getAttribute("preload")).to.equal("meta");
    });
    it('6.Проверка  параграфов',  function () {
        expect(dom.window.document.getElementsByTagName('p')[0]).to.contain.html("Звук свистка");
        expect(dom.window.document.getElementsByTagName('p')[1]).to.contain.html("Звук дождя");
        expect(dom.window.document.getElementsByTagName('p')[2]).to.contain.html("Звук молнии");
    });

});

