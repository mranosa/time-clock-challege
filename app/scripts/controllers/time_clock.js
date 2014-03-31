'use strict';

angular.module('timeClockChallegeApp')
	.controller('TimeClockCtrl', function($scope, $http, $localStorage, EmployeeService) {
		$scope.employee = $localStorage.currentEmployee;

		$scope.$watch('media', function(media) {
			if(media){
				console.log(media);
				EmployeeService.clockIn($scope.employee.id).then(function(result){
					console.log(result);
				});
			}
		});

		$http.get('/api/awesomeThings').success(function(awesomeThings) {
			$scope.awesomeThings = awesomeThings;
		});
	});