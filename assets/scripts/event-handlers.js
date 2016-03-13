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


$('#signup').on('submit',function(event) {
  authentication.signUp(event);
});

$('#login').on('submit',function(event) {
  authentication.logIn(event);
});


module.exports = true;
