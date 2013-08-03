define(['angular'], function(angular) {
	
	'use strict';
	
	/* Directives */
	angular.module('HarReports.directives', []).
	directive('upload', ['fileManager', '$http', function factory(fileManager, $http) {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	        	element.bind('change', function (event) {
	        		var files = event.target.files;
	                //iterate files since 'multiple' may be specified on the element
	                for (var i = 0;i<files.length;i++) {
	                	fileManager.upload(files[i]);
	                };       
	            });
	        }
	    };
	}]);
});