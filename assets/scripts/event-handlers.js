'use strict';

let authentication = require('./authentication');

$('.sign-up-button').on('click', function(){
  $('.welcome').hide();
  $('.sign-up-partial').show();
});

$('.sign-in-button').on('click', function(){
  $('.welcome').hide();
  $('.log-in-partial').show();
});

$('.back-to-welcome-button').on('click', function(){
  $('.welcome').show();
  $('.sign-up-partial').hide();
  $('.log-in-partial').hide();
});

$('.your-files').on('click', function() {
  $('.file-storage').show();
  $('.people-directory').hide();
});

$('.your-team').on('click', function() {
  $('.people-directory').show();
  $('.file-storage').hide();
});

$('#signup').on('submit',function(event) {
  authentication.signUp(event);
});

$('#log-in').on('submit',function(event) {
  authentication.logIn(event);
});

$('#log-out').on('click',function(event) {
  authentication.logOut(event);
});


module.exports = true;
