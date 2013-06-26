'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('HarReports.services', []).
factory('uploadManager', function ($rootScope) {
    var _files = [];
    return {
        add: function (file) {
            _files.push(file);
            $rootScope.$broadcast('fileAdded', file.name);
        },
        clear: function () {
            _files = [];
        },
        files: function () {
            var fileNames = [];
            angular.forEach(_files, function (index, file) {
                fileNames.push(file.name);
            });
            return fileNames;
        },
        setProgress: function (percentage) {
            $rootScope.$broadcast('uploadProgress', percentage);
        }
    };
});
