'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const request = require('request');
const ProgressBar = require('progress');

const log = console.log;
const dest = path.join(__dirname, 'tasks', 'a11y-theme-unit-test-data.xml');
const url = 'https://raw.githubusercontent.com/wpaccessibility/a11y-theme-unit-test/master/a11y-theme-unit-test-data.xml';

let file = fs.createWriteStream(dest);
let sendReq = request.get(url);

let bar;

// verify response code
sendReq.on('response', (response) => {
  let len = parseInt(response.headers['content-length'], 10);
  bar = new ProgressBar('  Fetching [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 100,
    total: len
  });

  if (response.statusCode !== 200) {
    log('Response status was ' + response.statusCode);
  } else {
    console.log(chalk.yellow('Start download of the A11y Theme Unit Test Data file from Github....'));
  }

});

sendReq.on('data', function (chunk) {
  bar.tick(chunk.length);
});

sendReq.pipe(file);

file.on('finish', () => {
  console.log(chalk.yellow('Download A11y Theme Unit Test Data file from Github completed'));
  file.close();  // close() is async, call cb after close completes.
});

file.on('error', (err) => { // Handle errors
  fs.unlink(dest); // Delete the file async. (But we don't check the result)
  log(err.message);
});

sendReq.end();




