'use strict';

let globalVariables = require('./global-variables');
let pageChanges = require('./page-changes');

let uniqueFolders = function uniqueFolders(images) {
  let foldersArray = [];
  for (let i = 0; i < images.length; i++ ) {
    foldersArray.push(images[i].folder[0]);
  }
  let uniqueArray = foldersArray.filter(function(elem, pos) {
    return foldersArray.indexOf(elem) === pos;
  });
  return uniqueArray;
  // console.log(uniqueArray);
};

let getImages = function getImages(event) {
  event.preventDefault();
  $('.level-zero').text('All Folders');
  $('.user-actions').show();
  var formData = new FormData(event.target);
  console.log('starting getImages');
  $.ajax({
    url: globalVariables.baseUrl + '/images',
    method: 'GET',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function (imagesCollection) {
    console.log(imagesCollection);
    console.log('getImages success');
    $('.homepage').hide();
    $('.edit-user').hide();
    $('.files-table').empty();
    $('.table-header').hide();
    $('.spacer-one').hide();
    $('.level-one').text('');
    $('.file-storage').show();
    $('.people-directory').hide();
    let ownedImages = [];
    for (let i = 0; i < imagesCollection.images.length; i++) {
      if (imagesCollection.images[i]._owner === globalVariables.user._id) {
        ownedImages.push(imagesCollection.images[i]);
      }
    }
    let imagesObject = { ownedImages: ownedImages };
    Object.assign(globalVariables, imagesObject);
    if (imagesObject.ownedImages.length) {
      let folders = uniqueFolders(ownedImages);
      for (let i = 0; i < folders.length; i++) {
        // people might put spaces into their folder names, which is no bueno if you're trying
        // to concatenate them into data attributes. this line swaps out a space for an underscore so it
        // can be used for that data attribute.
        $('.files-table').append("<div class='folder-row' data-folder-name="+folders[i].replace(' ','_')+">"+folders[i]+"</div>");
      }
    } else {
      $('.files-table').append("<div>You don't have any files! Upload some.</div>");
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
  for (let i = 0; i < globalVariables.ownedImages.length; i++) {
    if (folderName === globalVariables.ownedImages[i].folder[0]) {
      images.push(globalVariables.ownedImages[i]);
    }
  }
  if (images) {
    $('.files-table').empty();
    $('.spacer-one').show();
    $('.level-one').text(folderName);
    $('.table-header').show();
    let imageTemplate = require('./handlebars/images/images-listing.handlebars');
    $('.files-table').append(imageTemplate({images}));
  }
};

module.exports = {
  getImages,
  imageUpload,
  moveImage,
  deleteImage,
  openFolder
};
