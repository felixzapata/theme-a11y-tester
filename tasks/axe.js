'use strict';

const gulp = require('gulp');
const axeWebDriver = require('gulp-axe-webdriver');
const util = require('gulp-util');

let existsUrlParam = process.argv.indexOf('-url') !== -1;
let url = process.argv[4];

let urlsToRead = [];

let validateUrl = function (userInput) {
	if (userInput === 'localhost') {
		return true;
	} else {
		return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(userInput);
	}
};

let returnJSONResults = function () {

	const XMLPath = require('path').join(__dirname, 'a11y-theme-unit-test-data.xml');
	const fs = require('fs');
	const xml2js = require('xml2js');
	let urls;
	let json;

	try {

		let fileData = fs.readFileSync(XMLPath, 'ascii');
		let parser = new xml2js.Parser();

		parser.parseString(fileData.substring(0, fileData.length), (err, result) => {
			json = JSON.stringify(result);
			urls = result.rss.channel[0].item.filter((item) => {
				return item['wp:post_type'][0] === 'page' || item['wp:post_type'][0] === 'post';
			}).map((item) => {
				return item.link[0].replace('http://wpthemetestdata.wordpress.com/', url);
			});
		});
		return urls;
	} catch (ex) {
		console.log(ex)
	}

};

let readXML = function () {
	return returnJSONResults();
}

gulp.task('axe', (done) => {
	if (existsUrlParam && validateUrl(url)) {
		var options = {};
		if(urlsToRead.length === 0) {
			urlsToRead = readXML();
		}
		options = {
			urls: urlsToRead,
			showOnlyViolations: true,
			verbose: true,
			saveOutputIn: 'allHtml.json',
			browser: 'phantomjs'
		};
		return axeWebDriver(options, done);
	} else {
		util.log(util.colors.red('Please enter a valid url'));
		done();
	}

});



