'use strict';

angular.module('timeClockChallegeApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/oauth2/new').success(function(result) {
      console.log(result);
    });
  });
