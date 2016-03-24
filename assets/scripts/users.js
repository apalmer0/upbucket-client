'use strict';

let globalVariables = require('./global-variables');

let getCollaborators = function getCollaborators(users) {
  console.log('users length: '+users.users.length);
  console.log(globalVariables.user.collaborators);
  let collaboratingUsers = [];
  for (let i = 0; i < users.users.length; i++) {
    for (let j = 0; j < globalVariables.user.collaborators.length; j++) {
      if ( users.users[i]._id === globalVariables.user.collaborators[j]) {
        collaboratingUsers.push(users.users[i]);
      }
    }
  }
  $('.collaborators').empty();
  let collaboratorTemplate = require('./handlebars/users/collaborators-listing.handlebars');
  $('.collaborators').append(collaboratorTemplate({collaboratingUsers}));
};

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
    getCollaborators(users);
    $('.people-directory').show();
    $('.homepage').hide();
    $('.user-actions').hide();
    $('.file-storage').hide();
    $('.all-users').empty();
    $('.level-zero').text('All Users');
    $('.spacer-one').hide();
    $('.level-one').text('');
    console.log('getUsers success');
    console.log(users);
    let userTemplate = require('./handlebars/users/users-listing.handlebars');
    $('.all-users').append(userTemplate({users}));
  }).fail(function (jqxhr) {
    console.error(jqxhr);
  });
};

let addCollaborator = function addCollaborator(event) {
  let collaboratorId = event.target.dataset.userId;
  console.log('user id: '+collaboratorId);
  // if the target is NOT a chosen collaborator, add it
  if (event.target.className.indexOf('chosen-collaborator') === -1) {
    $.ajax({
      url: globalVariables.baseUrl + '/users/' + globalVariables.user._id,
      headers: {
        Authorization: 'Token token=' + globalVariables.user.token,
      },
      method: 'PATCH',
      // contentType: false,
      // processData: false,
      data: { "collaborators": collaboratorId }
    }).done(function () {
      // problems: need to 'move' chosen user tile from bottom to top
      console.log('collaborator added.');
      $('.chosen-collaborator').hide();
      $('.chosen-collaborator').removeClass('chosen-collaborator');
      globalVariables.user.collaborators[0] = collaboratorId;
      $('.user-number-'+collaboratorId).toggleClass('chosen-collaborator');
      let newCollaborator = require('./handlebars/users/collaborator.handlebars');
      $('.collaborators').append(newCollaborator({collaboratorId}));
      $('.user-number-'+collaboratorId).hide();
    }).fail(function (jqxhr) {
      console.log('shit\'s on fire, yo');
      console.error(jqxhr);
    });
  } else {
    console.log('already a collaborator');
    $('.user-number-'+collaboratorId).toggleClass('chosen-collaborator');
  }
};


module.exports = {
  getUsers,
  addCollaborator
};
