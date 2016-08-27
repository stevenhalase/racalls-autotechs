'use strict'
angular.module( 'racallsApp', ['ui.router'] )
  .config( racallsRouter );

  racallsRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function racallsRouter( $stateProvider, $urlRouterProvider ) {
    console.log('something')
    $stateProvider
      .state( 'home', {
        url : '/',
        views : {
          'nav' : {
            templateUrl : './nav/nav.html',
            controller : 'navCtrl as nCtrl'
          },
          'home' : {
            templateUrl : './home/home.html',
            controller : 'homeCtrl as hCtrl'
          },
          'footer' : {
            templateUrl : './footer/footer.html',
            controller : 'footerCtrl as fCtrl'
          }
        }
      })
      $urlRouterProvider.otherwise('/')
  }
