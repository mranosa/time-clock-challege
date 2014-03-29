'use strict';

angular.module('timeClockChallegeApp')
  .controller('SurnameCtrl', function ($scope, $http) {
  	$scope.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');


    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
