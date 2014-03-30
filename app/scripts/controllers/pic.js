'use strict';

angular.module('timeClockChallegeApp')
  .controller('PicCtrl', function ($scope, $http, $location, EmployeeService) {
  	$scope.employees = EmployeeService.getAllEmployeesWhereSurnameStartsWith($location.search().surname);
  	
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
