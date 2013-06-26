'use strict';


// Declare app level module which depends on filters, and services
angular.module('HarReports', ['HarReports.filters', 'HarReports.services', 'HarReports.directives', 'HarReports.controllers']).
	config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/home', {templateUrl: 'partials/home.html'});
	    $routeProvider.when('/cat1report1', {templateUrl: 'partials/cat1report1.html'});
	    $routeProvider.otherwise({redirectTo: '/home'});
	}]);
