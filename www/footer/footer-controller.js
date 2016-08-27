'use strict'
angular.module('racallsApp')
  .controller('footerCtrl', footerController);

  footerController.$inject = [];

  function footerController( ) {
    const fCtrl = this;
    fCtrl.title = 'Footer Controller';
  }
