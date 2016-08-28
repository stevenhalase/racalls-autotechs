'use strict'
const app = angular.module( 'racallsApp', ['ui.router', 'xeditable', 'ui.bootstrap'] )
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
      .state( 'invoice', {
        url : '/invoice',
        views : {
          'nav' : {
            templateUrl : './nav/nav.html',
            controller : 'navCtrl as nCtrl'
          },
          'invoice' : {
            templateUrl : './invoice/invoice.html',
            controller : 'invoiceCtrl as iCtrl'
          },
          'footer' : {
            templateUrl : './footer/footer.html',
            controller : 'footerCtrl as fCtrl'
          }
        }
      })
      $urlRouterProvider.otherwise('/')
  }

  app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });
