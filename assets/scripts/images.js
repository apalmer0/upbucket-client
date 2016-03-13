'use strict';

let globalVariables = require('./global-variables');

let getImages = function getImages(event) {
  event.preventDefault();
  var formData = new FormData(event.target);
  console.log('starting getImages');
  $.ajax({
    url: globalVariables.myApp.baseUrl + '/images',
    method: 'GET',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function (images) {
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
  $.ajax({
    url: globalVariables.myApp.baseUrl + '/images',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function (data) {
    console.log('imageUpload success');
    console.log(data);
    console.log('there\'s your data!');
  }).fail(function (jqxhr) {
    console.error(jqxhr);
  });
};


module.exports = {
  getImages,
  imageUpload
};
