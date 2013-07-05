'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('HarReports.services', []).
factory('fileManager', function ($rootScope, $http) {
    var _files = {};
    var _disabledFiles = {};
    
    var getKey = function (file) {
    	return file.lastModifiedDate.getTime();
    };
    
    var setProgress = function (percentage, key) {
    	_files[key].percentage = percentage;
        $rootScope.$broadcast('uploadProgress', {id: key, name: _files[key].file.name, percentage: percentage, enabled: true});
    };
    
    return {
        upload: function (file) {
        	var key = getKey(file);
        	if ( ! _files[key] ) {
        		_files[key] = {file : file, available: true};
        	}
            $rootScope.$broadcast('fileAdded', { id: key, name: file.name, percentage: 100, enabled: true}); //set to 100 due to no upload yet
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
            	setProgress(0, key);
            	$rootScope.$broadcast('fullData', {id: key, name: config.data.file.name, data: data});
            	
            }).
            error(function (data, status, headers, config) {
            	var key = getKey(config.data.file);
            	_files[key].progress = 0;
            	$rootScope.$broadcast('uploadError', "unable to load file");
            });
            
            
        },
        setFileAvailablity: function(id, available) {
        	if (available) {
        		if (_disabledFiles[id]) _files[id] = _disabledFiles[id];
        	} else {
        		_disabledFiles[id] = _files[id];
        		_files[id] = null;
        	}
        },
        clear: function () {
            _files = [];
        },
        clearFile: function(id) {
        	_files[id] = null;
        },
        files: function () {
            return _files;
        }
    };
});
