require.config({
	paths: {
		angular: ['http://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min', 'lib/angular/angular'],
		text: 'lib/require/text',
		goog: 'lib/require/goog',
		async: 'lib/require/async',
		propertyParser: 'lib/require/propertyParser'
	},
	baseUrl: 'js',
	shim: {
		'angular' : {'exports' : 'angular'}
	},
	priority: [
		"angular"
	]
});

require( [
	'angular',
	'app',
	'routes'
], function(angular, app, routes) {
	'use strict';
	
	angular.bootstrap(document.body, ['HarReports']);
});
