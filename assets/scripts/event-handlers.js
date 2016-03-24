'use strict';

let authentication = require('./authentication');
let images = require('./images');
let users = require('./users');

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

$('.sidebar-logo').on('click', function(){
  $('.people-directory').hide();
  $('.file-storage').hide();
  $('.homepage').show();
  $('.user-actions').hide();
  $('.breadcrumbs.level-zero').text('Home');
});

$('.upload-section').on('click', function() {
  if ($('.upload-file-form').hasClass('hidden')) {
    $('.upload-file-form').toggleClass('hidden');
    $('.upload-file-form').slideDown();
    $('.upload-section-icon').removeClass('glyphicon-chevron-down');
    $('.upload-section-icon').addClass('glyphicon-chevron-up');
  } else {
    $('.upload-file-form').toggleClass('hidden');
    $('.upload-file-form').slideUp();
    $('.upload-section-icon').addClass('glyphicon-chevron-down');
    $('.upload-section-icon').removeClass('glyphicon-chevron-up');
  }
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

$('#change-pw').on('submit',function(event) {
  authentication.changePassword(event);
});

$('.your-files').on('click', function(event) {
  images.getImages(event);
});

$('.breadcrumbs.level-zero').on('click', function(event) {
  images.getImages(event);
});

$('#file-upload').on('submit',function(event) {
  images.imageUpload(event);
});

$('.files-table').on('click', 'div.folder-row', function(event) {
  images.openFolder(event);
});

$('#move-image').on('submit', function(event) {
  images.moveImage(event);
});

$('.files-table').on('click', '#delete-image', function(event) {
  images.deleteImage(event);
});

$('.glyphicon-folder-open').on('click', function(){
  console.log('new folder');
});

$('.files-table').on('click', '.move-image-button', function(event) {
  $('.move-file-name').text(event.target.dataset.fileName);
  $('#inputDirectory5').val(event.target.dataset.fileFolder);
  $('.move-image-submit').attr('data-image-id', event.target.dataset.imageId);
});

$('.your-team').on('click', function(event) {
  users.getUsers(event);
});

$('.all-users').on('click', 'div.user-profile', function(event) {
  users.addCollaborator(event);
});

module.exports = true;
