'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const request = require('request');

const log = console.log;
const dest = path.join(__dirname, 'tasks');
const url = 'https://github.com/wpaccessibility/a11y-theme-unit-test/blob/master/a11y-theme-unit-test-data.xml';

let file = fs.createWriteStream(dest);
let sendReq = request.get(url);

// verify response code
sendReq.on('response', (response) => {
  if (response.statusCode !== 200) {
    log('Response status was ' + response.statusCode);
  } else {
    console.log(chalk.yellow('Fetching A11y Theme Unit Test Data file from Github....'));
  }
});

// check for request errors
sendReq.on('error', (err) => {
  fs.unlink(dest);
  log(err.message);
});

sendReq.pipe(file);

file.on('finish', () => {
  file.close(cb);  // close() is async, call cb after close completes.
});

file.on('error', (err) => { // Handle errors
  fs.unlink(dest); // Delete the file async. (But we don't check the result)

  if (cb) {
    log(err.message);
  }
});




