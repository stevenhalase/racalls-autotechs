'use strict'
app.controller('navCtrl', navController);

navController.$inject = ['$location'];

function navController( $location) {
  const nCtrl = this;
  nCtrl.title = 'Nav Controller';

  nCtrl.isActive = function (viewLocation) {
    // console.log(viewLocation)
    var active = (viewLocation === $location.path());
    return active;
  };
}
