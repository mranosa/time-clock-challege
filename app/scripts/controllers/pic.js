'use strict';

angular.module('timeClockChallegeApp')
	.controller('PicCtrl', function($scope, $http, $location, EmployeeService, $localStorage) {
		var gender = $localStorage.employeeGender;
		var surname = $location.search().surname;

		$scope.employees = EmployeeService.filterEmployees(surname, gender);

		$scope.selectEmployee = function(employee){
			$localStorage.currentEmployee = EmployeeService.getEmployee(employee.id);
			$location.path('/time_clock');
		};

		$http.get('/api/awesomeThings').success(function(awesomeThings) {
			$scope.awesomeThings = awesomeThings;
		});
	});