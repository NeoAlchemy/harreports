'use strict';

/* Controllers */


angular.module('HarReports.controllers', []).
controller('harReportsCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('data/reports.json').success(function(data) {
		$scope.reports = data;
	});
}]).
controller('fileManagerCtrl', ['$scope', '$rootScope', 'fileManager', function ($scope, $rootScope, fileManager) {
	$scope.files = [];
    
    $scope.upload = function () {
    	fileManager.upload();
    };
    
    //remove the file by splicing out of array
    $scope.close = function(id) {
    	for (var i=0; i<$scope.files.length; i++) {
    		if ($scope.files[i].id == id) {
    			$scope.files.splice(i, 1);
    		}
    	}
    };
    
    //if button clicked on is not primary then switch classes
    //make sure the file is marked enabled or not
    $scope.enabled = function(event, id) {
		for (var i=0; i<$scope.files.length; i++) {
    		if ($scope.files[i].id == id) {
    			$scope.files[i].enabled = (event.target.id ==  "file-enabled");
    		}
    	}
    };
    
    //find the index of the file from the array
    var _findIndex = function (file) {
    	for (var i=0; i<$scope.files.length; i++) {
    		if ($scope.files[i].id == file.id) {
    			return i;
    		}
    	}
    	return -1;
    };

    $rootScope.$on('fileAdded', function (e, call) {
        if ( _findIndex(call) == -1 ) {
        	$scope.files.push(call);
            $scope.$apply();
        }
    });

    $rootScope.$on('uploadProgress', function (e, call) {
    	var index = _findIndex(call);
    	if (index != -1 ) {
    		$scope.files[index] = call;
    		$scope.$apply();
    	}
    });
    
    $rootScope.$on('fullData', function (e, call) {
    	var index = _findIndex(call);
    	if (index != -1 ) {
    		$scope.files[index].data = call.data;
    		$scope.$apply();
    	}
    });
}]).
controller('reportsCtrl', ['$scope', 'fileManager', function($scope, fileManager) {
	$scope.files = fileManager.files();
}]);