'use strict';

angular.module('timeClockChallegeApp')
  .controller('TimeClockCtrl', function ($scope, $http, $localStorage) {
  	$scope.employee = $localStorage.currentEmployee;

    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
