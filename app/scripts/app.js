'use strict';

angular.module('timeClockChallegeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'omr.directives',
  'angular-underscore'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/surname', {
        templateUrl: 'partials/surname',
        controller: 'SurnameCtrl'
      })
      .when('/pic', {
        templateUrl: 'partials/pic',
        controller: 'PicCtrl'
      })
      .when('/time_clock', {
        templateUrl: 'partials/time_clock',
        controller: 'TimeClockCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });