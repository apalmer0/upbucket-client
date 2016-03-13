'use strict';

// user require with a reference to bundle the file and use it in this file
let pageSetup = require('./page-setup');
let authentication = require('./authentication');

// use require without a reference to ensure a file is bundled
require('./event-handlers');

$(document).ready(() => {

pageSetup.hidePageElements();



});
