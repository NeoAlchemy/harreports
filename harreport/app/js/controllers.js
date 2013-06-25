'use strict';

/* Controllers */


angular.module('HarReports.controllers', []).
  controller('harReportsCtrl', ['$scope', '$http', function($scope, $http) {
		$http.get('data/reports.json').success(function(data) {
			$scope.reports = data;
		});
  }])