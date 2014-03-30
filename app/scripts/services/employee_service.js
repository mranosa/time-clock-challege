'use strict';

angular.module('timeClockChallegeApp')
	.service('EmployeeService', function EmployeeService($http) {
		var employees = [];
		var EmployeeService = function() {
			$http.get('/api/employees').success(function(result) {
				var employeesData = result.employees;
				var token = result.token;

				console.log(result);

				var arrayLength = employeesData.length;

				console.log(arrayLength);
				for (var i = 0; i < arrayLength; i++) {
					$http.get('/api/employee?id=' + employeesData[i].id + '&token=' + token).success(function(result) {
						console.log('Added : ' + result);
						employees.push(result);
					});
				}
			});
		};

		EmployeeService.prototype = {
			show: function() {

			}
		}

		return new EmployeeService();
	});