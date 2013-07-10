'use strict';

/* Filters */

angular.module('HarReports.filters', []).
filter('displaySeconds', function() {
	return function(value) {
		if (isNaN(value)) { 
			return "0s";
		} else {
			var seconds = value/1000;
			if (seconds > 59) {
				var minutes = seconds/60;
				return minutes + "mins";
			} else {
				return seconds + "s";
			}
		}
	}
});