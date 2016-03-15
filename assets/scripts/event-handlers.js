'use strict';

let authentication = require('./authentication');
let images = require('./images');

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

$('.your-files').on('click', function(event) {
  images.getImages(event);
});

$('#file-upload').on('submit',function(event) {
  images.imageUpload(event);
});

$('.files-table').on('click', 'button.delete-image-button', function(event) {
  // images.deleteImage(event);
  console.log('this will be the delete button, eventually.');
});


module.exports = true;
