'use strict';

angular.module('timeClockChallegeApp')
	.service('EmployeeService', function EmployeeService($http, $rootScope) {
		var loadingStatus = true;
		var employees = [];
		var currCount = 0;
		var currToken = '';
		var EmployeeService = function() {
			$http.get('/api/employees').success(function(result) {
				var employeesData = result.employees;
				var token = result.token;
				currToken = token;

				console.log(result);

				var arrayLength = employeesData.length;

				console.log(arrayLength);
				for (var i = 0; i < arrayLength; i++) {
					$http.get('/api/employee?id=' + employeesData[i].id + '&token=' + token).success(function(result) {
						console.log(result.employee);
						employees.push(result.employee);
						currCount += 1;
						$rootScope.$broadcast('update-loading-message', 'loaded ' + currCount + ' of ' + arrayLength);

						if (currCount === arrayLength) {
							$rootScope.$broadcast('hide-loading');
							loadingStatus = false;
						}
					});
				}
			});
		};

		EmployeeService.prototype = {
			getLoadingStatus: function() {
				return loadingStatus;
			},
			filterEmployees: function(letter, gender) {
				if (!letter) {
					letter = 'a';
				}
				return _.filter(employees, function(employee) {
					return employee.details.lastname.charAt(0).toLowerCase() === letter.toLowerCase() && employee.details.gender === gender;
				});
			},
			getEmployee: function(id) {
				return _.find(employees, function(employee) {
					return employee.id === id;
				});
			},
			clockIn: function(id) {
				return new Promise(function(resolve, reject) {
					$http.get('/api/employee/clockIn?id=' + id + '&token=' + currToken + '&kindVal=clock_in').success(function(result) {
						console.log(id);
						resolve(result);
					}).error(function(error){
						reject(error);
					});
				});
			}
		};

		return new EmployeeService();
	});