'use strict';

let authentication = require('./authentication');

$('.sign-up-button').on('click', function(){
  $('.welcome').hide();
  $('.sign-up').show();
});

$('.sign-in-button').on('click', function(){
  $('.welcome').hide();
  $('.log-in').show();
});

$('.back-to-welcome-button').on('click', function(){
  $('.welcome').show();
  $('.sign-up').hide();
  $('.log-in').hide();
});


$('#signup').on('submit',function(event) {
  authentication.signUp(event);
});

$('#login').on('submit',function(event) {
  authentication.logIn(event);
});


module.exports = true;
