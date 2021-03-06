'use strict';

let globalVariables = require('./global-variables');
let pageSetup = require('./page-setup');
let pageChanges = require('./page-changes');

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
  }).done(function (userData) {
    console.log('logged in');
    Object.assign(globalVariables, userData);
    console.log(userData);
    console.log('theres the user');
    $('.user-name').text(userData.user.fullName);
    pageSetup.toggleLoggedIn();
  }).fail(function (jqxhr) {
    console.error(jqxhr);
  });
};

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
    logIn(event);
    console.log('signup success');
    console.log(data);
    console.log('there\'s your data!');
  }).fail(function (jqxhr) {
    console.error(jqxhr);
  });
};

// log out actions
let logOut = function logOut (event) {
  console.log(globalVariables);
  event.preventDefault();
  var formData = new FormData(event.target);
  $.ajax({
    url: globalVariables.baseUrl + '/sign-out/' + globalVariables.user._id,
    headers: {
      Authorization: 'Token token=' + globalVariables.user.token,
    },
    method: 'DELETE',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function (data) {
    globalVariables.userData = {};
    globalVariables.ownedImages = {};
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
