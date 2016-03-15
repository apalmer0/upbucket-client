'use strict';

let globalVariables = require('./global-variables');
let pageChanges = require('./page-changes');

let uniqueFolders = function uniqueFolders(images) {
  let foldersArray = [];
  for (let i = 0; i < images.images.length; i++ ) {
    foldersArray.push(images.images[i].folder[0]);
  }
  let uniqueArray = foldersArray.filter(function(elem, pos) {
    return foldersArray.indexOf(elem) === pos;
  });
  console.log(uniqueArray);
};

let getImages = function getImages(event) {
  event.preventDefault();
  var formData = new FormData(event.target);
  console.log('starting getImages');
  $.ajax({
    url: globalVariables.baseUrl + '/images',
    method: 'GET',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function (images) {
    Object.assign(globalVariables, images);
    uniqueFolders(images);
    $('.files-table').empty();
    $('.file-storage').show();
    $('.people-directory').hide();
    console.log('getImages success');
    let newImageTemplate = require('./handlebars/images/images-listing.handlebars');
    $('.files-table').append(newImageTemplate({images}));
  }).fail(function (jqxhr) {
    console.error(jqxhr);
  });
};


let imageUpload = function imageUpload(event) {
  event.preventDefault();
  var formData = new FormData(event.target);
  console.log('starting imageUpload');
  console.log(event.target);
  $.ajax({
    url: globalVariables.baseUrl + '/images',
    headers: {
      Authorization: 'Token token=' + globalVariables.user.token,
    },
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function (data) {
    console.log('imageUpload success');
    console.log(data);
    $('.file-upload').val('');
    pageChanges.displayMessage('.file-upload-success');
  }).fail(function (jqxhr) {
    console.log('shit\'s on fire, yo');
    console.error(jqxhr);
  });
};


let deleteImage = function deleteImage(event) {
  event.preventDefault();
  console.log('starting delete');
  let imageId = event.target.dataset.imageId;
  $.ajax({
    url: globalVariables.baseUrl + '/images/' + imageId,
    headers: {
      Authorization: 'Token token=' + globalVariables.user.token,
    },
    method: 'DELETE',
  }).done(function (data) {
    console.log('image deleted');
    console.log(data);
    $('.image-number-'+imageId).remove();
  }).fail(function (jqxhr) {
    console.log('well that didn\'t work...');
    console.error(jqxhr);
  });
};

let openFolder = function openFolder(event) {
  let folderName = event.target.dataset.folderName;
  console.log(event.target.dataset.folderName);
};

module.exports = {
  getImages,
  imageUpload,
  deleteImage,
  openFolder
};
