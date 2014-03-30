'use strict';

angular.module('timeClockChallegeApp')
  .controller('MainCtrl', function ($scope, $http) {
  	$scope.employees = {};
    $http.get('/api/employees').success(function(result) {
    	$scope.employees = result.employees
    });
  });