'use strict';


var hideModal = function hideModal() {
  $('.modal').hide();
  $('.modal').removeClass('in');
  $('.modal').attr('style','display: none;');
  $('.modal-backdrop').hide();
  $('body').removeClass('modal-open');
};


module.exports = {
  hideModal
};
