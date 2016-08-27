'use strict'
angular.module('racallsApp')
  .controller('homeCtrl', homeController);

  homeController.$inject = [];

  function homeController( ) {
    const hCtrl = this;
    hCtrl.title = 'Home Controller';

    jQuery(document).ready(function($) {
			$('.home-slider').unslider({
        animation: 'horizontal',
        autoplay: true,
        infinite: true,
        arrows: false,
        delay: 5000,
        speed: 1000
      });
		});
  }
