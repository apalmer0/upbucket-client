'use strict';

let globalVariables = require('./global-variables');
let pageChanges = require('./page-changes');

let getUsers = function getUsers(event) {
  event.preventDefault();
  console.log('starting getUsers');
  $.ajax({
    url: globalVariables.baseUrl + '/users',
    headers: {
      Authorization: 'Token token=' + globalVariables.user.token,
    },
    method: 'GET'
  }).done(function (users) {
    $('.people-directory').show();
    $('.file-storage').hide();
    $('.people-directory').empty();
    $('.level-zero').text('All users');
    $('.spacer-one').hide();
    $('.level-one').text('');
    console.log('getUsers success');
    console.log(users);
    let userTemplate = require('./handlebars/users/users-listing.handlebars');
    $('.people-directory').append(userTemplate({users}));
  }).fail(function (jqxhr) {
    console.error(jqxhr);
  });
};


module.exports = {
  getUsers
};
