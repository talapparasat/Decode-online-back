'use strict';

var barista = require('seed-barista');
var expect = require('chai').expect;

var styles = "<!DOCTYPE html><html>	<head>		<title>Веб-приложения</title>			</head>	<body>		<h1>Веб-приложения</h1>		<hr>		<hr>		<h2>Что такое веб-приложения?</h2>		<p>Веб-приложение — клиент-серверное приложение, в котором клиент взаимодействует с веб-сервером при помощи браузера</p>		<hr>		<h2>Чем веб-приложения отличаются от обычных сайтов?</h2>		<p>Обычные сайты - это набор подготовленных заранее HTML-файлов, которые лежат на удаленном сервере и отдаются браузеру по запросу. </p>		<p>Веб-приложение является технически более сложным чем обычные сайты. Тут HTML-страницы генерируются на лету в зависимости от запроса пользователя. Почтовые клиенты, соцсети, поисковики, интернет-магазины, онлайн-программы для бизнеса, это все веб-приложения.</p>	</body></html>";

describe('example: test: text-align', function() {

var output = barista({
content: styles,
});

it('should have a h1 + style', function() {
var rule = output.rule('h1');

expect(rule.prop('text-align')).to.equal('center');
});

it('should have a h2 + style', function() {
var rule = output.rule('h2');

expect(rule.prop('text-align')).to.equal('center');
});

it('should have a p + style', function() {
var rule = output.rule('p');

expect(rule.prop('text-align')).to.equal('justify');
});
});