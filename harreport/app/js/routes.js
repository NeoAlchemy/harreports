define([
        'angular', 
        'app', 
        'controllers/pageLoad/pageResponseTimeBytesAndRequest',
        'controllers/pageLoad/4xx5xxErrorReport'
    ], 
    function(angular, app) {
	'use strict';
	
	return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	    $routeProvider.when('', {templateUrl: 'partials/home.html'});
	    $routeProvider.when('/pageLoad/pageResponseTimeBytesAndRequest', { templateUrl: 'partials/pageLoad/pageResponseTimeBytesAndRequest.html' });
	    $routeProvider.when('/pageLoad/4xx5xxErrorReport', { templateUrl: 'partials/pageLoad/4xx5xxErrorReport.html' });
	    $routeProvider.otherwise({redirectTo: ''});
	    //$locationProvider.html5Mode(true);
	}]);
});