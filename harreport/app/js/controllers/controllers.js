define(['angular', 'services/fileManagerFactory'], function(angular, fileManager) {
	
	'use strict';

	/* Controllers */
	var HarReportsController = angular.module('HarReports.controllers', []);
	
	HarReportsController.controller('harReportsCtrl', ['$scope', '$http', function($scope, $http) {
		$http.get('data/reports.json').success(function(data) {
			$scope.reports = data;
		});
	}]);
	
	HarReportsController.controller('fileManagerCtrl', ['$scope', '$rootScope', 'fileManager', function ($scope, $rootScope, fileManager) {
		$scope.files = [];
	    
	    $scope.upload = function () {
	    	fileManager.upload();
	    };
	    
	    //remove the file by splicing out of array
	    $scope.close = function(id) {
	    	for (var i=0; i<$scope.files.length; i++) {
	    		if ($scope.files[i].id == id) {
	    			$scope.files.splice(i, 1);
	    			fileManager.clearFile(id);
	    		}
	    	}
	    };
	    
	    //if button clicked on is not primary then switch classes
	    //make sure the file is marked enabled or not
	    $scope.enabled = function(event, id) {
			for (var i=0; i<$scope.files.length; i++) {
	    		if ($scope.files[i].id == id) {
	    			var isEnabled = (event.target.id ==  "file-enabled");
	    			$scope.files[i].enabled = isEnabled;
	    			fileManager.setFileAvailablity(id, isEnabled);
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
	        	$scope.$$phase || $scope.$apply();
	        }
	    });
	
	    $rootScope.$on('uploadProgress', function (e, call) {
	    	var index = _findIndex(call);
	    	if (index != -1 ) {
	    		$scope.files[index] = call;
	    		$scope.$$phase || $scope.$apply();
	    	}
	    });
	    
	    $rootScope.$on('fullData', function (e, call) {
	    	var index = _findIndex(call);
	    	if (index != -1 ) {
	    		$scope.files[index].data = call.data;
	    		$scope.$$phase || $scope.$apply();
	    	}
	    });
	}]);
	
	HarReportsController.controller('reportsCtrl', ['$scope', 'fileManager', function($scope, fileManager) {
		$scope.files = fileManager.files();
		
		$scope.$watch('files', function(files) {
			$scope.harList = [];
			for (var fileKey in files) {
				var fileObj = files[fileKey];
				if (fileObj) $scope.harList.push(fileObj.data);
			}
		}, true);
		
		
	}]);
	
	HarReportsController.controller('reportListCtrl', ['$scope', '$filter', function($scope, $filter) {
		$scope.isCategoryEmpty = function(subReportLists) {
			var filteredResults = $filter('filter')(subReportLists, this.query);
			return filteredResults.length == 0;
		};
	}]);
	
	return HarReportsController;
});