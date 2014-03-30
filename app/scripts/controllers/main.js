'use strict';

angular.module('timeClockChallegeApp')
	.controller('MainCtrl', function($scope, $http, EmployeeService) {

		$scope.loading = EmployeeService.getLoadingStatus();
		$scope.loadingMessage = 'Loading employees info please wait...';

		$scope.safeApply = function(fn) {
			var phase = this.$root.$$phase;
			if (phase === '$apply' || phase === '$digest')
				this.$eval(fn);
			else
				this.$apply(fn);
		};

		$scope.$on('update-loading-message', function(event, message) {
			$scope.safeApply(function() {
				$scope.loadingMessage = message;
			});
		});

		$scope.$on('hide-loading', function() {
			$scope.safeApply(function() {
				$scope.loading = false;
			});
		});
	});