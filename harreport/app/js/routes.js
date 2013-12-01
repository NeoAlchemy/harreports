define([
        'angular', 
        'app', 
        'controllers/pageLoad/pageResponseTimeBytesAndRequest',
        'controllers/pageLoad/4xx5xxErrorReport',
        'controllers/contentBreakdown/totalBytesPerContent',
        'controllers/contentBreakdown/totalRequestsPerContent',
        'controllers/contentBreakdown/totalResponseTimePerContent',
        'controllers/ajaxCharts/totalBytesPerAjaxContent',
        'controllers/ajaxCharts/totalRequestsPerAjaxContent',
        'controllers/ajaxCharts/totalResponseTimePerAjaxContent'
    ], 
    function(angular, app) {
	'use strict';
	
	return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	    $routeProvider.when('', {templateUrl: 'partials/home.html'});
	    $routeProvider.when('/pageLoad/pageResponseTimeBytesAndRequest', { templateUrl: 'partials/pageLoad/pageResponseTimeBytesAndRequest.html' });
	    $routeProvider.when('/pageLoad/4xx5xxErrorReport', { templateUrl: 'partials/pageLoad/4xx5xxErrorReport.html' });
	    $routeProvider.when('/contentBreakdown/totalBytesPerContent', { templateUrl: 'partials/contentBreakdown/totalBytesPerContent.html' });
	    $routeProvider.when('/contentBreakdown/totalRequestsPerContent', { templateUrl: 'partials/contentBreakdown/totalRequestsPerContent.html' });
	    $routeProvider.when('/contentBreakdown/totalResponseTimePerContent', { templateUrl: 'partials/contentBreakdown/totalResponseTimePerContent.html' });
	    $routeProvider.when('/ajaxCharts/totalBytesPerAjaxContent', { templateUrl: 'partials/ajaxCharts/totalBytesPerAjaxContent.html' });
	    $routeProvider.when('/ajaxCharts/totalRequestsPerAjaxContent', { templateUrl: 'partials/ajaxCharts/totalRequestsPerAjaxContent.html' });
	    $routeProvider.when('/ajaxCharts/totalResponseTimePerAjaxContent', { templateUrl: 'partials/ajaxCharts/totalResponseTimePerAjaxContent.html' });
	    $routeProvider.otherwise({redirectTo: ''});
	    //$locationProvider.html5Mode(true);
	}]);
});