'use strict'

angular.module('main').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', ($stateProvider, $urlRouterProvider, $httpProvider) => {
    $urlRouterProvider.otherwise('/listing');

  $stateProvider.state('listing', {
    url: '/listing',
    templateUrl: 'app/listing/listing.html',
    controller: 'ListingCtrl'

  }).state('details', {
    url: '/details:id',
    templateUrl: 'app/details/details.html',
    controller: 'DetailsCtrl'
  });

  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);
