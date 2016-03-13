'use strict';

var hidePageElements = function hidePageElements() {
  $('.sign-up-partial').hide();
  $('.log-in-partial').hide();
  $('.logged-out').hide();
  $('.logged-in').show();
};

var toggleLoggedIn = function toggleLoggedIn() {
  $('.logged-in').show();
  $('.logged-out').hide();
};

var toggleLoggedOut = function toggleLoggedOut() {
  $('.logged-out').show();
  $('.logged-in').hide();
};



module.exports = {
  toggleLoggedIn,
  toggleLoggedOut,
  hidePageElements
};
