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
  return uniqueArray;
  // console.log(uniqueArray);
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
    console.log('getImages success');
    Object.assign(globalVariables, images);
    $('.table-header').hide();
    $('.spacer-one').hide();
    $('.level-one').text('');
    $('.files-table').empty();
    $('.file-storage').show();
    $('.people-directory').hide();
    let folders = uniqueFolders(images);
    for (let i = 0; i < folders.length; i++) {
      $('.files-table').append("<div class='folder-row' data-folder-name="+folders[i].replace(' ','_')+">"+folders[i]+"</div>");
    }
  }).fail(function (jqxhr) {
    console.error(jqxhr);
  });
};


let imageUpload = function imageUpload(event) {
  event.preventDefault();
  $('.upload-owner').val(globalVariables.user._id);
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

let moveImage = function moveImage(event) {
  event.preventDefault();
  let imageId = $('.move-image-submit')[0].dataset.imageId.toString();
  console.log('starting moveImage');
  console.log('image id: '+imageId);
  console.log(event.target);
  console.log('going to:'+$('#inputDirectory6').val());
  var formData = new FormData(event.target);
  $.ajax({
    url: globalVariables.baseUrl + '/images/' + imageId,
    headers: {
      Authorization: 'Token token=' + globalVariables.user.token,
    },
    method: 'PATCH',
    contentType: false,
    processData: false,
    data: formData
  }).done(function (data) {
    console.log('moveImage success');
    console.log(data);
  }).fail(function (jqxhr) {
    console.log('shit\'s on fire, yo');
    console.error(jqxhr);
  });
};


let deleteImage = function deleteImage(event) {
  event.preventDefault();
  console.log('starting delete');
  let imageId = event.target.dataset.imageId;
  // *TODO* add a popup here confirming the user's decision
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
    pageChanges.displayMessage('.file-delete-success');
  }).fail(function (jqxhr) {
    console.log('well that didn\'t work...');
    console.error(jqxhr);
  });
};

let openFolder = function openFolder() {
  let folderName = event.target.dataset.folderName.replace('_',' ');
  let images = [];
  for (let i = 0; i < globalVariables.images.length; i++) {
    if (folderName === globalVariables.images[i].folder[0]) {
      images.push(globalVariables.images[i]);
    }
  }
  if (images) {
    $('.files-table').empty();
    $('.spacer-one').show();
    $('.level-one').text(folderName);
    $('.table-header').show();
    let newImageTemplate = require('./handlebars/images/images-listing.handlebars');
    $('.files-table').append(newImageTemplate({images}));

  }
};

module.exports = {
  getImages,
  imageUpload,
  moveImage,
  deleteImage,
  openFolder
};
