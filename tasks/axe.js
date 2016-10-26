'use strict';
var gulp = require('gulp');
var axeWebDriver = require('gulp-axe-webdriver');

var url = 'http://wcsantander/';

var validateUrl = function (userInput) {
	if (userInput === 'localhost') {
		return true;
	} else {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		return regexp.test(userInput);
	}
};

var returnJSONResults = function () {
	var XMLPath = require('path').join(__dirname, 'theme-unit-test-data.xml');
	var fs = require('fs');
	var xml2js = require('xml2js');
	var urls;
	var json;
	try {
		var fileData = fs.readFileSync(XMLPath, 'ascii');
		var parser = new xml2js.Parser();
		parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
			json = JSON.stringify(result);
			urls = result.rss.channel[0].item.filter(function (item) {
				return item['wp:post_type'][0] === 'page' || item['wp:post_type'][0] === 'post';
			}).map(function (item) {
				return item.link[0].replace('http://wpthemetestdata.wordpress.com/', url);
			});
		});
		return urls;
	} catch (ex) {
		console.log(ex)
	}

};

function readXML() {
	return returnJSONResults();
}

gulp.task('axe', function (done) {
	var options = {
		urls: readXML(),
		showOnlyViolations: true,
		verbose: true,
		saveOutputIn: 'allHtml.json',
		browser: 'phantomjs'
	};
	return axeWebDriver(options, done);
});



