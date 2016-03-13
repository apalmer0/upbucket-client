'use strict';

let signUp = function signUp(event) {
  event.preventDefault();
  console.log('awesome.');
};

let logIn = function logIn(event) {
  event.preventDefault();
  console.log('awesome.');
};

module.exports = {
  signUp,
  logIn
};
