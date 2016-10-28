# theme-a11y-tester
An environment for testing WordPress themes for the accessibility-ready requirements.

This environment is based in the use of [gulp-axe-webdriver](https://github.com/felixzapata/grunt-axe-webdriver).

## Requirements

* [Node.js](https://nodejs.org/es/).
* A fresh install of a WordPress site.
* The theme you want to test.
* Import [this XML file](https://raw.githubusercontent.com/wpaccessibility/a11y-theme-unit-test/master/a11y-theme-unit-test-data.xml) into your fresh WordPress instalation. 

## Getting started

Download this repository or clone it and then run `npm install`.

## How to use

### Examples

`gulp themeA11yTester -url http://www.my-WordPress-url-to-analyze.com`

`gulp themeA11yTester -url http://my-local-WordPress-url-to-analyze`



