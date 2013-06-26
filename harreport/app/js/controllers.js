'use strict';

/* Controllers */


angular.module('HarReports.controllers', []).
controller('harReportsCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('data/reports.json').success(function(data) {
		$scope.reports = data;
	});
}]).
controller('fileManagerCtrl', ['$scope', '$rootScope', 'uploadManager', function ($scope, $rootScope, uploadManager) {
    $scope.files = [];
    $scope.percentage = 0;

    $scope.upload = function () {
        uploadManager.upload();
        $scope.files = [];
    };

    $rootScope.$on('fileAdded', function (e, call) {
        $scope.files.push(call);
        //$scope.$apply();
    });

    $rootScope.$on('uploadProgress', function (e, call) {
        $scope.percentage = call;
        //$scope.$apply();
    })
}])