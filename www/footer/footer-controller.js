'use strict'
app.controller('footerCtrl', footerController);

footerController.$inject = [];

function footerController( ) {
  const fCtrl = this;
  fCtrl.title = 'Footer Controller';
}
