'use strict';

let authentication = require('./authentication');
let images = require('./images');
let users = require('./users');
let globalVariables = require('./global-variables');

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
  $('.edit-user').hide();
  $('.breadcrumbs.level-zero').text('Home');
});

$('#edit-profile').on('click', function(){
  $('.people-directory').hide();
  $('.file-storage').hide();
  $('.homepage').hide();
  $('.user-actions').hide();
  $('.edit-user').show();
  $('.breadcrumbs.level-zero').text('Edit user info');
  $('.edit-user-firstName').text(globalVariables.user.name.given);
  $('.edit-user-lastName').text(globalVariables.user.name.surname);
  $('.edit-user-email').text(globalVariables.user.email);
  $('.edit-user-firstName').val(globalVariables.user.name.given);
  $('.edit-user-lastName').val(globalVariables.user.name.surname);
  $('.edit-user-email').val(globalVariables.user.email);
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

$('#edit-image').on('submit', function(event) {
  images.editImage(event);
});

$('.files-table').on('click', '#delete-image', function(event) {
  images.deleteImage(event);
});

$('.glyphicon-folder-open').on('click', function(){
  console.log('new folder');
});

$('.files-table').on('click', '.edit-image-button', function(event) {
  console.log(event.target.dataset);
  $('.edit-image-name').text(event.target.dataset.fileName);
  $('.edit-image-comment').text(event.target.dataset.imageComment);
  $('.edit-image-tags').text(event.target.dataset.imageTags);
  $('.edit-image-folder').text(event.target.dataset.imageFolder);
  $('.edit-image-name').val(event.target.dataset.fileName);
  $('.edit-image-comment').val(event.target.dataset.imageComment);
  $('.edit-image-tags').val(event.target.dataset.imageTags);
  $('.edit-image-folder').val(event.target.dataset.imageFolder);
  $('.edit-image-submit').attr('data-image-id', event.target.dataset.imageId);
});

$('.your-team').on('click', function(event) {
  users.getUsers(event);
});

$('.all-users').on('click', 'div.user-profile', function(event) {
  users.addCollaborator(event);
});

$('#edit-user-data').on('submit',function(event) {
  users.submitUserEdits(event);
});

module.exports = true;
