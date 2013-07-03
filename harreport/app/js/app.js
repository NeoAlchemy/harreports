'use strict';


// Declare app level module which depends on filters, and services
angular.module('HarReports', ['HarReports.filters', 'HarReports.services', 'HarReports.directives', 'HarReports.controllers']).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	    $routeProvider.when('', {templateUrl: 'partials/home.html'});
	    $routeProvider.when('/cat1report1', {templateUrl: 'partials/cat1report1.html'});
	    $routeProvider.otherwise({redirectTo: ''});
	    //$locationProvider.html5Mode(true);
	}]);
