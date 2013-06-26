'use strict';

/* Directives */


angular.module('HarReports.directives', []).
directive('upload', ['uploadManager', '$http', function factory(uploadManager, $http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
        	element.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                	uploadManager.add(files[i]);
                	$http({
                        method: 'POST',
                        url: "readHar.php",
                        headers: { 'Content-Type': false },
                        transformRequest: function (data) {
                            var formData = new FormData();
                            for (var i = 0; i < data.files.length; i++) {
                                formData.append("file" + i, data.files[i]);
                            }
                            return formData;
                        },
                        data: { files: files }
                    }).
                    success(function (data, status, headers, config) {
                    	console.log(data);
                    	uploadManager.setProgress(0);
                    }).
                    error(function (data, status, headers, config) {
                    	uploadManager.setProgress(0);
                    });
                }                                       
            });
        }
    };
}]);