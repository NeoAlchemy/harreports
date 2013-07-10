'use strict';

HarReportsServices.factory('HarAdapter', function () {

	return function(harObject) {
        // the start time that network happened
		var _initialStartTime = new Date(harObject.log.pages[0].startedDateTime).getTime();
        
		// this is the last request made and the amount of time it takes
        var _getLastRequestFinalTime = function() {
        	var lastEntry = harObject.log.entries[harObject.log.entries.length - 1];
			var lastRequestTime = 0;
			for (var timeKey in lastEntry.timings) {
				lastRequestTime = lastEntry.timings[timeKey] + lastRequestTime;
			}
			var endTime = new Date(lastEntry.startedDateTime).getTime() + lastRequestTime;
			return endTime;
        };
        
        
        /**
         * Public methods
         */
		return {
			getTotalRequestTime: function() {
				return _getLastRequestFinalTime() - _initialStartTime;
			}
		}
    };
});
