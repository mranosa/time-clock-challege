'use strict';

angular.module('timeClockChallegeApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Gender',
      'link': '/'
    },{
      'title': 'Surname',
      'link': '/surname'
    },{
      'title': 'Pic',
      'link': '/pic'
    },{
      'title': 'Time Clock',
      'link': '/time_clock'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
