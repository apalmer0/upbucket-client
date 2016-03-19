'use strict';

var hidePageElements = function hidePageElements() {
  $('.sign-up-partial').hide();
  $('.log-in-partial').hide();
  $('.people-directory').hide();
  $('.popup-messages').hide();
  $('.spacer-one').hide();
  $('.table-header').hide();
  $('.logged-out').show();
  $('.logged-in').hide();
};

var toggleLoggedIn = function toggleLoggedIn() {
  $('.logged-in').show();
  $('.logged-out').hide();
};

var toggleLoggedOut = function toggleLoggedOut() {
  $('.logged-in').hide();
  $('.logged-out').show();
};



module.exports = {
  toggleLoggedIn,
  toggleLoggedOut,
  hidePageElements
};
