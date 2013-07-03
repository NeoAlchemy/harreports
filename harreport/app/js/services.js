'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('HarReports.services', []).
factory('fileManager', function ($rootScope, $http) {
    var _files = {};
    
    var getKey = function (file) {
    	return file.lastModifiedDate.getTime();
    };
    
    return {
        upload: function (file) {
        	var key = getKey(file);
            _files[key] = file;
            var fileManager = this;
            this.setProgress(100, file);
        	$http({
                method: 'POST',
                url: "readHar.php",
                headers: { 'Content-Type': false },
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("file", data.file);
                    return formData;
                },
                data: { file: file }
            }).
            success(function (data, status, headers, config) {
            	//TODO handle multiple files
            	var key = getKey(config.data.file);
            	_files[key].data = data;
            	_files[key].progress = 0;
            	$rootScope.$broadcast('uploadProgress', {id: key, name: config.data.file.name, percentage: 0, enabled: true});
            	$rootScope.$broadcast('fullData', {id: key, name: config.data.file.name, data: data});
            	
            }).
            error(function (data, status, headers, config) {
            	var key = getKey(config.data.file);
            	_files[key].progress = 0;
            	$rootScope.$broadcast('uploadError', "unable to load file");
            });
            
            $rootScope.$broadcast('fileAdded', { id: key, name: file.name, percentage: 0, enabled: true});
        },
        clear: function () {
            _files = [];
        },
        files: function () {
            return _files;
        },
        setData: function(file, data) {
        	var key = getKey(file);
        	_files[key].data = data;
        	$rootScope.$broadcast('fullData', {id: key, name: file.name, data: data});
        },
        setProgress: function (percentage, file) {
        	var key = getKey(file);
        	_files[key].percentage = percentage;
            $rootScope.$broadcast('uploadProgress', {id: key, name: file.name, percentage: percentage, enabled: true});
        }
    };
});
