'use strict';

let globalVariables = require('./global-variables');
let pageSetup = require('./page-setup');
let pageChanges = require('./page-changes');

let signUp = function signUp(event) {
  event.preventDefault();
  var formData = new FormData(event.target);
  console.log('starting signup');
  $.ajax({
    url: globalVariables.baseUrl + '/sign-up',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function (data) {
    console.log('signup success');
    console.log(data);
    console.log('there\'s your data!');
  }).fail(function (jqxhr) {
    console.error(jqxhr);
  });
};

let logIn = function logIn(event) {
  event.preventDefault();
  console.log('starting login.');
  var formData = new FormData(event.target);
  $.ajax({
    url: globalVariables.baseUrl + '/sign-in',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function (user) {
    console.log('logged in');
    Object.assign(globalVariables, user);
    console.log(user);
    console.log('theres the user');
    pageSetup.toggleLoggedIn();
  }).fail(function (jqxhr) {
    console.error(jqxhr);
  });
};

// log out actions
let logOut = function logOut (event) {
  event.preventDefault();
  var formData = new FormData(event.target);
  $.ajax({
    // why do i have to access these via myApp.user.user?
    url: globalVariables.baseUrl + '/sign-out/' + globalVariables.user._id,
    headers: {
      Authorization: 'Token token=' + globalVariables.user.token,
    },
    method: 'DELETE',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function (data) {
    console.log(data);
    console.log('logged out');
    pageSetup.toggleLoggedOut();
  }).fail(function (jqxhr) {
    console.error(jqxhr);
  });
};

let changePassword = function changePassword (event) {
  event.preventDefault();
  var formData = new FormData(event.target);
  $.ajax({
    url: globalVariables.baseUrl + '/change-password/' + globalVariables.user._id,
    headers: {
      Authorization: 'Token token=' + globalVariables.user.token,
    },
    method: 'PATCH',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function (data) {
    console.log(data);
    pageChanges.displayMessage('.password-changed-success');
    pageChanges.hideModal();
  }).fail(function (jqxhr) {
    console.error(jqxhr);
  });
};

module.exports = {
  signUp,
  logIn,
  logOut,
  changePassword
};
