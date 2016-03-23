'use strict';

var hidePageElements = function hidePageElements() {
  $('.sign-up-partial').hide();
  $('.log-in-partial').hide();
  $('.people-directory').hide();
  $('.popup-messages').hide();
  $('.upload-file-form').hide();
  $('.spacer-one').hide();
  $('.table-header').hide();
  $('.logged-out').show();
  $('.logged-in').hide();
};

var toggleLoggedIn = function toggleLoggedIn() {
  $('.logged-in').show();
  $('.homepage').show();
  $('.logged-out').hide();
};

var toggleLoggedOut = function toggleLoggedOut() {
  $('.logged-in').hide();
  $('.logged-out').show();
  $('.people-directory').hide();
  $('.file-directory').hide();
  $('.files-table').empty();
  $('.collaborators').empty();
  $('.all-users').empty();
};



module.exports = {
  toggleLoggedIn,
  toggleLoggedOut,
  hidePageElements
};
