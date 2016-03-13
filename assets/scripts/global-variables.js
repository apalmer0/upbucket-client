'use strict';

const myApp = {
  baseUrl: document.location.hostname === 'localhost' ?
    'http://localhost:3000' :
    'http://localhost:3000',
};


module.exports = {
  myApp
};
