'use strict';

angular.module('timeClockChallegeApp')
  .controller('TimeClockCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
