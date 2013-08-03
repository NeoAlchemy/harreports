define([
    'angular', 
    'filters', 
    'services/services', 
    'directives', 
    'controllers/controllers'
    ], function(angular, filters, services, directives, controllers) {
		'use strict';

		return angular.module('HarReports', ['HarReports.filters', 'HarReports.services', 'HarReports.directives', 'HarReports.controllers']);
});